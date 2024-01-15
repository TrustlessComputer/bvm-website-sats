import SectionImage from '@/assets/images/image_section_1.png';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { TextInput2 } from '@/components/TextInput/TextInput2';
import { IOrderBuyReq } from '@/interface/services/client';
import { Image } from '@/modules/Wellcome/styled';
import client from '@/services/client';
import { useAppSelector } from '@/state/hooks';
import { useFetchUserData, useIsAuthenticated } from '@/state/user/hooks';
import { getErrorMessage } from '@/utils';
import formatter from '@/utils/amount';
import sleep from '@/utils/sleep';
import { Slider, Radio, RadioChangeEvent } from 'antd';
import BigNumber from 'bignumber.js';
import { debounce, throttle } from 'lodash';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Spinner } from '@/components/Spinner';
import toast from 'react-hot-toast';
import { MIN_GAS_PRICE, ServiceTypeEnum } from '../Account/Order/FormOrder.constants';
import {
  DALayerEnum,
  NativeTokenPayingGasEnum,
  NetworkEnum,
  PluginEnum,
  PluginTypeEnum,
  RollupEnum,
} from './Buy.constanst';
import {
  convertDayToSeconds,
  dayDescribe,
  getBuyBuilderStateInit,
  getChainIDRandom,
  getRandonComputerName,
} from './Buy.helpers';
import { BuyDataBuilder, BuyBuilderSelectState, SectionProps, ItemDetail } from './Buy.types';
import Item from './components/Item';
import Segment from './components/Segment';
import Title from './components/Title';
import * as S from './styled';
import Section from './components/Section';
import useRouteHelper from '@/hooks/useRouterHelper';
import { WalletContext } from '@/contexts/wallet.context';
import { SupportedChainId } from '@/chains';
import { useLocation } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { accountInfoSelector, userGamefiByAddressSelector } from '@/state/user/selector';
import IconSVG from '@/components/IconSVG';
import configs from '@/configs';
import { MessageCircle } from 'react-feather';
import { Row } from '@/components/Row';
import { EmailVerifier } from '@/components/EmailVerifier';
import { ModalsContext } from '@/contexts/modals.context';
import CustomizeTokenModal from './CustomizeTokenModal';
import CustomizeTokenView from './CustomizeTokenView';

type Props = {
  onSuccess?: () => void;
};

const BuyPage = React.memo((props: Props) => {
  const { onSuccess } = props;
  const { goDashboardPage } = useRouteHelper();
  const isAuthenticated = useIsAuthenticated();
  const { onConnect } = useContext(WalletContext);
  const { account } = useWeb3React();
  const userGamefi = useAppSelector(userGamefiByAddressSelector)(account);
  const onFetchData = useFetchUserData();
  const { search } = useLocation();
  const { toggleContact } = useContext(ModalsContext);

  const [paymentTransactionGas, setPaymentTransactionGas] = useState<NativeTokenPayingGasEnum>(
    NativeTokenPayingGasEnum.NativeTokenPayingGas_BVM,
  );

  const [showVerifyEmail, setShowVerifyEmail] = useState<boolean>(false);
  // const [showCustomizeTokenModal, setShowCustomizeTokenModal] = useState<boolean>(true);

  const accountInfo = useAppSelector(accountInfoSelector);

  const urlParams = new URLSearchParams(search);
  const typeData = urlParams?.get('type')?.replace('/', '') || undefined;
  const builderStateInit = getBuyBuilderStateInit(typeData);

  const [loading, setLoading] = useState<boolean>(false);
  const [isTyping, setTyping] = useState<boolean>(false);
  const [isFetching, setFetching] = useState<boolean>(false);
  const initFirst = React.useRef<boolean>(true);

  const [formDataCustomizeToken, setFormDataCustomizeToken] = useState<{
    isError: boolean;
    data:
      | {
          totalSupply: string;
          receivingAddress: string;
          tickerName: string;
        }
      | undefined;
  }>({
    isError: true,
    data: undefined,
  });

  const [subdomainErrorMessage, setSubdomainErrorMessage] = useState<string | undefined>(undefined);
  const [minGasPriceErrorMessage, setMinGasPriceErrorMessage] = useState<string | undefined>(undefined);

  const [totalCost, setTotalCost] = useState<any>('0');
  const [isTotalCostFetching, setTotalCostFetching] = useState<boolean>(false);
  const [chainIDRandom, setChainIDRandom] = useState<number | undefined>(undefined);

  const [data, setData] = useState<BuyDataBuilder | undefined>(undefined);
  const [buyBuilderState, setBuyBuilderState] = useState<BuyBuilderSelectState>(builderStateInit);
  console.log('SALE rollupProtocol: ', typeof data?.rollupProtocol);
  console.log('SALE buyBuilderState: ', buyBuilderState.rollupProtocol);

  // console.log('DEBUG buyBuilderState: ', buyBuilderState);

  const isMainnet = useMemo(() => {
    return buyBuilderState.network === NetworkEnum.Network_Mainnet;
  }, [buyBuilderState.network]);

  const confirmBtnTitle = useMemo(() => {
    if (isMainnet) {
      return 'Contact us';
    } else if (!isAuthenticated) {
      return 'Connect Wallet';
    } else {
      return 'Build a Bitcoin L2';
    }
  }, [isMainnet, accountInfo]);

  useEffect(() => {
    const getChainIDRandomFunc = async () => {
      try {
        const newChainIDRandom = await getChainIDRandom();
        setChainIDRandom(newChainIDRandom);
      } catch (error) {
        setChainIDRandom(undefined);
      }
    };
    getChainIDRandomFunc();
  }, []);

  useEffect(() => {
    if (initFirst.current) return;
    setBuyBuilderState({
      ...buyBuilderState,
      dataAvaibilityChain: isMainnet ? DALayerEnum.DALayer_BTC : DALayerEnum.DALayer_BTC,
    });
  }, [isMainnet]);

  useEffect(() => {
    setBuyBuilderState({
      ...buyBuilderState,
      chainName: getRandonComputerName(isMainnet),
    });
  }, [isMainnet]);

  const fetchData = async () => {
    try {
      setFetching(true);
      const data = await client.fetchBuyBuilderInfo();
      setData(data);
      // console.log('[BuyPage] DEBUG fetchData ==> ', data);
    } catch (error) {
      // console.log('[BuyPage] DEBUG fetchData ==> ', error);
      setData(undefined);
    } finally {
      setFetching(false);
    }
  };

  const getEstimateOrderBuy = useCallback(
    debounce(async buyBuilderState => {
      try {
        setTotalCostFetching(true);
        const finalizationPeriodSeconds = convertDayToSeconds(buyBuilderState.withdrawPeriod);
        const chainID = chainIDRandom ?? (await getChainIDRandom());
        const chainName = buyBuilderState.chainName;
        const domain = buyBuilderState.chainName?.toLowerCase()?.trim().replaceAll(' ', '-');
        const blockTime = buyBuilderState.blockTime;
        const minGasPrice = new BigNumber(2).multipliedBy(1e9).toFixed();
        const dataAvaibilityChain = buyBuilderState.dataAvaibilityChain;
        const isMainnet = buyBuilderState.network === NetworkEnum.Network_Mainnet;

        const params: IOrderBuyReq = {
          serviceType: ServiceTypeEnum.DEFAULT, //hard code
          domain: domain,
          chainId: String(chainID), //random
          chainName: chainName,
          description: '', //hard code
          finalizationPeriod: Math.ceil(finalizationPeriodSeconds),
          blockTime: Number(blockTime),
          minGasPrice: minGasPrice,
          dataAvaibilityChain: Number(dataAvaibilityChain),
          isMainnet: isMainnet,
          userName: ((userGamefi || {}) as any)?.name || '',
          pluginIds: [PluginEnum.Plugin_Bridge],
          nativeTokenPayingGas: NativeTokenPayingGasEnum.NativeTokenPayingGas_BVM,
        };
        // console.log('CREATE ORDER BUY params ==>> ', params);

        const result = await client.orderBuyEstimateAPI(params);
        setTotalCost(result || '0');
      } catch (error) {
        const { message } = getErrorMessage(error);
        toast.error(message);
        setTotalCost('0');
      } finally {
        setTotalCostFetching(false);
      }
    }, 700),
    [chainIDRandom],
  );

  useEffect(() => {
    if (isMainnet) {
      getEstimateOrderBuy(buyBuilderState);
    } else {
      setTotalCost('0');
    }
  }, [buyBuilderState, isMainnet]);

  const isDisabledSubmit = useMemo(() => {
    return loading || isTyping || !!subdomainErrorMessage || !!minGasPriceErrorMessage;
  }, [loading, isTyping, subdomainErrorMessage]);

  const totalCostStr = useMemo(() => {
    if (Number(totalCost) == 0 || Number(totalCost) === 0) {
      return `Free`;
    } else {
      return `Total: ${formatter.formatAmount({
        originalAmount: Number(totalCost),
        decimals: 18,
        maxDigits: 2,
        isCeil: true,
      })} BVM`;
    }
  }, [totalCost]);

  useEffect(() => {
    fetchData();
  }, []);

  const onChange = (value: number) => {
    if (isNaN(value)) {
      return;
    }
    setBuyBuilderState({
      ...buyBuilderState,
      withdrawPeriod: Number(value),
    });
  };

  const renderNetworkSection = (props: SectionProps) => {
    const { title = '', desc = '', sectionType, valueDisabled, data, descriptionDetail } = props;
    const dataList = data as ItemDetail[];
    return (
      <Section title={title} description={desc} descriptionDetail={descriptionDetail}>
        <S.ListItemContainer>
          {dataList?.map((item, index) => {
            const contentValue = item.value === NetworkEnum.Network_Mainnet ? item.price : '7-day free trial';
            return (
              <React.Fragment key={`${item.valueStr} ${index}`}>
                <Item
                  isMainnet={isMainnet}
                  key={`${item.valueStr} ${index}`}
                  value={item.value}
                  isSelected={item.value === buyBuilderState.network}
                  disabled={item.value === valueDisabled}
                  title={item.valueStr}
                  content={contentValue}
                  priceNote={item.priceNote}
                  onClickCallback={value => {
                    setBuyBuilderState({
                      ...buyBuilderState,
                      [sectionType]: value,
                    });
                  }}
                />
              </React.Fragment>
            );
          })}
        </S.ListItemContainer>
      </Section>
    );
  };

  const renderRollupProtocolSection = (props: SectionProps) => {
    const { title = '', desc = '', sectionType, valueDisabled, data, descriptionDetail } = props;
    const dataList: ItemDetail[] = isMainnet ? data[NetworkEnum.Network_Mainnet] : data[NetworkEnum.Network_Testnet];
    return (
      <Section title={title} description={desc} descriptionDetail={descriptionDetail}>
        <S.ListItemContainer>
          {dataList?.map((item, index) => {
            let privaeValue = item.price;
            return (
              <React.Fragment key={`${item.valueStr} ${index}`}>
                <Item
                  isMainnet={isMainnet}
                  key={`${item.valueStr} ${index}`}
                  value={item.value}
                  isSelected={item.value === buyBuilderState.rollupProtocol}
                  disabled={item.value === valueDisabled}
                  title={item.valueStr}
                  content={privaeValue}
                  priceNote={item.priceNote}
                  onClickCallback={value => {
                    setBuyBuilderState({
                      ...buyBuilderState,
                      [sectionType]: value,
                    });
                  }}
                />
              </React.Fragment>
            );
          })}
        </S.ListItemContainer>
      </Section>
    );
  };

  const renderDataAvaibilitySection = (props: SectionProps) => {
    const { title = '', desc = '', sectionType, valueDisabled, data, descriptionDetail } = props;
    const dataList: ItemDetail[] = isMainnet ? data[NetworkEnum.Network_Mainnet] : data[NetworkEnum.Network_Testnet];
    return (
      <Section title={title} description={desc} descriptionDetail={descriptionDetail}>
        <S.ListItemContainer>
          {dataList?.map((item, index) => {
            let privaeValue = item.price;
            return (
              <React.Fragment key={`${item.valueStr} ${index}`}>
                <Item
                  isMainnet={isMainnet}
                  key={`${item.valueStr} ${index}`}
                  value={item.value}
                  isSelected={item.value === buyBuilderState.dataAvaibilityChain}
                  disabled={item.value === valueDisabled}
                  title={item.valueStr}
                  content={privaeValue}
                  priceNote={item.priceNote}
                  onClickCallback={value => {
                    setBuyBuilderState({
                      ...buyBuilderState,
                      [sectionType]: value,
                    });
                  }}
                />
              </React.Fragment>
            );
          })}
        </S.ListItemContainer>
      </Section>
    );
  };

  const renderBlockTimeSection = (props: SectionProps) => {
    const { title = '', desc = '', sectionType, valueDisabled, data, descriptionDetail } = props;
    const dataListBasedNetwork: any[] = isMainnet
      ? data[NetworkEnum.Network_Mainnet]
      : data[NetworkEnum.Network_Testnet];

    const dataList: ItemDetail[] = dataListBasedNetwork[buyBuilderState.dataAvaibilityChain] || [];

    return (
      <Section title={title} description={desc} descriptionDetail={descriptionDetail}>
        <S.ListItemContainer>
          {dataList?.map((item, index) => {
            let price = item.price;
            return (
              <React.Fragment key={`${item.valueStr} ${index}`}>
                <Item
                  isMainnet={isMainnet}
                  key={`${item.valueStr} ${index}`}
                  value={item.value}
                  isSelected={item.value === buyBuilderState.blockTime}
                  disabled={item.value === valueDisabled}
                  title={item.valueStr}
                  content={price}
                  priceNote={item.priceNote}
                  onClickCallback={value => {
                    setBuyBuilderState({
                      ...buyBuilderState,
                      [sectionType]: value,
                    });
                  }}
                />
              </React.Fragment>
            );
          })}
        </S.ListItemContainer>
      </Section>
    );
  };

  const renderSegmentSection = (props: SectionProps) => {
    const { title = '', data, sectionType } = props;
    if (!data || data.length < 1) return null;

    const dataList: ItemDetail[] = isMainnet ? data[NetworkEnum.Network_Mainnet] : data[NetworkEnum.Network_Testnet];

    return (
      <S.Section>
        <Title text={title} />
        <S.ListItemContainer>
          {dataList.map((item, index) => {
            return (
              <React.Fragment key={`${item.valueStr} ${index}`}>
                <Segment
                  item={item}
                  isMainnet={isMainnet}
                  indexSelected={buyBuilderState.pluginIds[0]}
                  pluinType={item.pluginType}
                  disabled={item.pluginType !== PluginTypeEnum.PluginType_Bridge}
                  onClick={item => {
                    setBuyBuilderState({
                      ...buyBuilderState,
                      [sectionType]: item.value,
                    });
                  }}
                />
              </React.Fragment>
            );
          })}
        </S.ListItemContainer>
      </S.Section>
    );
  };

  const renderWithdrawalPeriod = (props: SectionProps) => {
    const { title = '', desc = '', descriptionDetail } = props;
    return (
      <Section title={title} description={desc} descriptionDetail={descriptionDetail}>
        <S.Section>
          <Slider
            min={0}
            max={7}
            onChange={onChange}
            tooltip={{ placement: 'top', formatter: value => `${value} ${value === 1 ? 'day' : 'days'}` }}
            value={Number(buyBuilderState.withdrawPeriod ?? 0)}
            step={0.1}
          />
          <Text size="18" fontWeight="medium" align="left">
            {`${dayDescribe(buyBuilderState.withdrawPeriod).str}`}
          </Text>
        </S.Section>
      </Section>
    );
  };

  const renderTokenPayingGas = (props: SectionProps) => {
    const { title = '', desc = '', sectionType, valueDisabled, data, descriptionDetail } = props;
    const dataList: ItemDetail[] = isMainnet ? data[NetworkEnum.Network_Mainnet] : data[NetworkEnum.Network_Testnet];

    return (
      <Section title={title} description={desc} descriptionDetail={descriptionDetail}>
        <S.Space />
        <S.Section>
          <Radio.Group
            onChange={(e: any) => {
              setPaymentTransactionGas(e.target.value);
            }}
            value={paymentTransactionGas}
          >
            {dataList.map(item => {
              return (
                <Radio
                  value={item.value}
                  style={{
                    fontSize: '16px',
                    fontWeight: '600px',
                  }}
                >
                  {item.valueStr}
                </Radio>
              );
            })}
          </Radio.Group>
          {paymentTransactionGas === NativeTokenPayingGasEnum.NativeTokenPayingGas_PreMint && (
            <>
              <S.Space />
              <CustomizeTokenView
                formDataCallback={(isError, data) => {
                  setFormDataCustomizeToken({
                    isError,
                    data,
                  });
                }}
              ></CustomizeTokenView>
            </>
          )}
        </S.Section>
      </Section>
    );
  };

  const onChangeComputerNameHandler = useCallback(
    debounce(async (text: string) => {
      if (!text || text.length < 1) {
        setSubdomainErrorMessage('Computer name is required.');
        setTyping(false);
      }

      // else if (text.length > CHAIN_NAME_MAX_LENGTH) {
      //   setSubdomainErrorMessage(`Computer name must be at least ${CHAIN_NAME_MAX_LENGTH} characters.`);
      //   setTyping(false);
      // }
      else {
        try {
          const isValid = await client.validateSubDomainAPI(text);
          setSubdomainErrorMessage(isValid ? undefined : 'Something went wrong');
        } catch (error: any) {
          setSubdomainErrorMessage(error.toString() || 'Subdomain is invalid');
        } finally {
          setTimeout(() => {
            setTyping(false);
          }, 500);
        }
      }
    }, 500),
    [],
  );

  const onChangeGasPriceHandler = (text: string) => {
    if (!text || text.length < 1) {
      setMinGasPriceErrorMessage('Min gas price is required.');
    } else if (Number(text) < MIN_GAS_PRICE) {
      setMinGasPriceErrorMessage(`Min gas price must be at least ${MIN_GAS_PRICE} Gwei.`);
    } else {
      setMinGasPriceErrorMessage(undefined);
    }
  };

  const renderComputerName = () => {
    return (
      <S.Section>
        <Title text={'Computer Name'} />
        <S.Space />
        <TextInput2
          placeholder=""
          id={'ComputerName-ID'}
          name={'FormFields.chainName'}
          value={buyBuilderState.chainName}
          onBlur={e => {
            onChangeComputerNameHandler(e.target.value);
          }}
          onChange={e => {
            const chainName = e.target.value;
            setBuyBuilderState({
              ...buyBuilderState,
              chainName: chainName,
            });
            onChangeComputerNameHandler(chainName);
          }}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              handleSubmit({
                bypassEmail: false,
              });
            }
          }}
          type="text"
          step={'any'}
          autoComplete="off"
          spellCheck={false}
          autoFocus={true}
          onWheel={(e: any) => e?.target?.blur()}
        />
        {subdomainErrorMessage && !isTyping && (
          <Text size="14" fontWeight="regular" color="negative">
            {subdomainErrorMessage}
          </Text>
        )}
      </S.Section>
    );
  };

  const renderMinGasPrice = (props: SectionProps) => {
    const { title = '', desc = '', descriptionDetail } = props;
    return (
      <Section title={title} description={desc} descriptionDetail={descriptionDetail}>
        <S.Section>
          <TextInput2
            placeholder=""
            id={'MinGasPrice-ID'}
            value={buyBuilderState.minGasPrice}
            onBlur={e => {
              onChangeComputerNameHandler(e.target.value);
            }}
            onChange={e => {
              const minGasPrice = e.target.value;
              setBuyBuilderState({
                ...buyBuilderState,
                minGasPrice: minGasPrice,
              });
              onChangeGasPriceHandler(minGasPrice);
              // onChangeComputerNameHandler(chainName);
            }}
            type="number"
            step={'any'}
            autoComplete="off"
            spellCheck={false}
            onWheel={(e: any) => e?.target?.blur()}
          />
          {minGasPriceErrorMessage && !isTyping && (
            <Text size="14" fontWeight="regular" color="negative">
              {minGasPriceErrorMessage}
            </Text>
          )}
        </S.Section>
      </Section>
    );
  };

  const handleSubmit = throttle(
    async ({ bypassEmail }: { bypassEmail: boolean }) => {
      try {
        if (!isAuthenticated) {
          const isSuccess = await onConnect(SupportedChainId.NOS);
          if (!isSuccess) {
            return setLoading(false);
          }
        }

        if (subdomainErrorMessage || isTyping || !buyBuilderState.chainName) return;

        if (isMainnet) {
          // return setShowVerifyEmail(true);/
          //SHOW FORM CONTACT US!
          // return setShowContacUseForm(true);
          toggleContact();
          return;
        } else {
          // if (!accountInfo?.emailVerified && !bypassEmail) {
          //   return setShowVerifyEmail(true);
          // }
        }

        setLoading(true);

        const finalizationPeriodSeconds = convertDayToSeconds(buyBuilderState.withdrawPeriod);
        const chainID = chainIDRandom ?? (await getChainIDRandom());
        const chainName = buyBuilderState.chainName;
        const domain = buyBuilderState.chainName?.toLowerCase()?.trim().replaceAll(' ', '-');
        const blockTime = buyBuilderState.blockTime;
        const minGasPrice = new BigNumber(2).multipliedBy(1e9).toFixed();
        const dataAvaibilityChain = buyBuilderState.dataAvaibilityChain;

        let params: IOrderBuyReq = {
          serviceType: ServiceTypeEnum.DEFAULT, //hard code
          domain: domain,
          chainId: String(chainID), //random
          chainName: chainName,
          description: '', //hard code
          finalizationPeriod: Math.ceil(finalizationPeriodSeconds),
          blockTime: Number(blockTime),
          minGasPrice: minGasPrice,
          dataAvaibilityChain: Number(dataAvaibilityChain),
          isMainnet: isMainnet,
          userName: ((userGamefi || {}) as any)?.name || '',
          pluginIds: [PluginEnum.Plugin_Bridge],
          nativeTokenPayingGas: paymentTransactionGas,
        };

        if (paymentTransactionGas === NativeTokenPayingGasEnum.NativeTokenPayingGas_PreMint) {
          if (formDataCustomizeToken.isError) return;
          else
            params = {
              ...params,
              preMintAmount: new BigNumber(formDataCustomizeToken.data?.totalSupply || '0')
                .multipliedBy(1e18)
                .toFixed(),
              preMintAddress: formDataCustomizeToken.data?.receivingAddress,
              ticker: formDataCustomizeToken.data?.tickerName,
            };
        }

        console.log('DEBUG [handleSubmit] params: ', params);

        const result = await client.orderBuyAPI(params);
        await sleep(2);
        if (result) {
          onFetchData();
          await sleep(1);
          toast.success('Order successful', {
            duration: 1000,
          });
          goDashboardPage(params.isMainnet, true);
        }
        onSuccess && onSuccess();
      } catch (error) {
        const { message } = getErrorMessage(error);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    1000,
    {
      leading: true,
      trailing: false,
    },
  );

  if (isFetching)
    return (
      <S.Container>
        <Spinner color="button_primary" className="spinner" />;
      </S.Container>
    );

  if (!data) return <></>;

  return (
    <>
      <S.Container>
        <S.LeftContainer>
          <div className="sticky">
            <Image src={SectionImage} />
            <Row align="center" justify="center" gap={16}>
              <MessageCircle />
              <div>
                <Text size="14" align="center">
                  Have questions about Bitcoin Virtual Machine?
                </Text>
                <Text size="12" align="center" className="discord">
                  <a href={configs.DISCORD_TRUSTLESS_URL} target="_blank">
                    Chat with us via Discord
                  </a>
                </Text>
              </div>
            </Row>
          </div>
        </S.LeftContainer>
        <S.RightContainer>
          <Text size="32" fontWeight="semibold" align="left" className="header">
            Customize your Bitcoin Virtual Machine
          </Text>
          <Text size="20" fontWeight="regular" align="left" className="header">
            Bitcoin Virtual Machines are secure, low-cost, and lightning-fast L2 blockchains — fully loaded with DEX,
            DAO, NFT marketplace, and the whole shebang!
          </Text>
          <div className="sectionList">
            {/* Computer Name */}
            {renderComputerName()}

            {/* Network */}
            {data?.network &&
              renderNetworkSection({
                title: 'Network',
                desc: 'Which network is right for you?',
                data: data.network,
                sectionType: 'network',
                descriptionDetail: {
                  title: 'Network',
                  content: <p>Select whether you want to create a testnet or deploy a mainnet. The testnet is free.</p>,
                },
              })}

            {/* Rollup Protocol */}
            {data?.rollupProtocol &&
              renderRollupProtocolSection({
                title: 'Rollup Protocol',
                desc: 'Which rollup protocol is right for you?',
                data: data.rollupProtocol,
                sectionType: 'rollupProtocol',
                valueDisabled: RollupEnum.Rollup_ZK,
                descriptionDetail: {
                  title: 'Rollup Protocol',
                  content: (
                    <p>
                      You can choose from two types of rollups with different security models:
                      <br />
                      <br />
                      <span>• Optimistic rollups:</span> assumes transactions are valid by default and only runs
                      computation, via a fraud proof, in the event of a challenge.
                      <br />
                      <p className="mt-12">
                        <span>• Zero-knowledge rollups:</span> runs computation off-chain and submits a validity proof
                        to the chain.
                      </p>
                    </p>
                  ),
                },
              })}

            {/* DataAvaibility Chain */}
            {data?.dataAvaibilityChain &&
              renderDataAvaibilitySection({
                title: 'Data Availability',
                desc: 'Which data availability layer is right for you?',
                data: data.dataAvaibilityChain,
                sectionType: 'dataAvaibilityChain',
                descriptionDetail: {
                  title: 'Data Availability',
                  content: (
                    <p>
                      Initially, there are two types of data availability options:
                      <br />
                      <br />
                      <span>• Bitcoin + Polygon:</span> the data is written to the Polygon network. This is a pragmatic
                      and hybrid approach, where data availability is on Polygon, and data validation is on Bitcoin.
                      <br />
                      <p className="mt-12">
                        <span>• Bitcoin:</span> thanks to the Taproot-type transaction, it is now possible to embed any
                        data into a Bitcoin Blockchain, which will be permanently stored on the Bitcoin network and
                        inherit its features, such as availability, immutability, and determinism.
                      </p>
                    </p>
                  ),
                },
              })}

            {/* Block Time */}
            {data?.blockTime &&
              renderBlockTimeSection({
                title: 'Block Time',
                desc: 'How fast do you want your Bitcoin Virtual Machine to go?',
                data: data?.blockTime,
                sectionType: 'blockTime',
                descriptionDetail: {
                  title: 'Block Time',
                  content: (
                    <p>
                      There are three types of block time options:
                      <br />
                      <br />
                      <span>• 2 seconds:</span> this block time is perfectly suited for use cases like gaming.
                      <br />
                      <p className="mt-12">
                        <span>• 5 seconds:</span> for use cases requiring slightly less extreme speed, this option is
                        suitable.
                      </p>
                      <p className="mt-12">
                        <span>• 10 seconds:</span> the most cost-effective rollup solution when speed is not a priority
                        aligned with your preferences.
                      </p>
                    </p>
                  ),
                },
              })}

            {/* Min Gas Price */}
            {renderMinGasPrice({
              title: 'Min Gas Price (Gwei)',
              desc: 'Which min gas price is right for you?',
              sectionType: 'blockTime',
              descriptionDetail: {
                title: 'Min Gas Price (Gwei)',
                content: (
                  <p>
                    Similar to the minimum gas price on other EVM-based blockchains, the gas price for transactions
                    within your Bitcoin Virtual Machine must be set to a value higher than or equal to the one you
                    choose.
                  </p>
                ),
              },
            })}

            {/* Withdrawal Period (SLIDER)*/}
            {renderWithdrawalPeriod({
              title: 'Withdrawal Period',
              desc: 'Which withdrawal period is right for you?',
              sectionType: 'blockTime',
              descriptionDetail: {
                title: 'Withdrawal Period',
                content: (
                  <p>
                    If you've selected Optimistic Rollups as your rollup protocol, you will need to determine a
                    challenge period for your users' withdrawals. This entails requiring them to wait until the
                    challenge period has passed before they can withdraw the funds held in escrow on Bitcoin Virtual
                    Machine Layer 1.
                    <br />
                    <p className="mt-12">
                      The challenge period must be a value greater than zero, as it takes time for an individual
                      (referred to as the challenger) to identify an invalid state root claim and subsequently initiate
                      the challenge process. Presently, you have the option to select a period lasting from 1 hour to 7
                      days.
                    </p>
                  </p>
                ),
              },
            })}
            <div style={{ height: '2px' }}></div>
            {/* Token for paying Transaction Gas */}
            {data?.nativeTokenPayingGas &&
              renderTokenPayingGas({
                title: 'Native token for paying transaction gas',
                desc: '',
                data: data.nativeTokenPayingGas,
                sectionType: 'nativeTokenPayingGas',
                descriptionDetail: {
                  title: '',
                  content: '',
                },
              })}

            {/* Plugin */}
            {data?.plugin &&
              renderSegmentSection({
                title: 'Pre-Installed Dapps (coming soon)',
                data: data?.plugin,
                sectionType: 'plugin',
              })}
          </div>
        </S.RightContainer>
      </S.Container>
      <S.FooterView>
        <S.FooterInfo>
          <Row align="center">
            <IconSVG maxWidth="28" src={`${configs.CDN_APP_ICON_URL}/ic-computer.svg`} className="mr-8" />
            <Text size="18" fontWeight="semibold">
              Bitcoin Virtual Machine
            </Text>
          </Row>
          {!!data && (
            <Row gap={42}>
              <div className="grid-content">
                <Text size="16">
                  <span>• Network: </span>
                  {(data.network || []).find(item => item.value === buyBuilderState.network)?.valueStr}
                </Text>
                <Text size="16">
                  <span>• Block Time: </span>
                  {buyBuilderState.blockTime}s
                </Text>
              </div>
              <div className="grid-content">
                <Text size="16">
                  <span>• Rollup Protocol: </span>
                  Optimistic Rollups
                </Text>
                <Text size="16">
                  <span>• Withdrawal Period: </span>
                  {dayDescribe(buyBuilderState.withdrawPeriod).timer}
                </Text>
              </div>
            </Row>
          )}
          <Text color="text_secondary" size="14">
            {isMainnet ? 'This process can take up to 12 hours' : 'This process can take up to 20 minutes'}
          </Text>
        </S.FooterInfo>
        <S.FooterActions>
          {isTotalCostFetching ? (
            <Spinner size={24} />
          ) : (
            <Text size="26" fontWeight="semibold" align="left" className="cost">
              {totalCostStr}
            </Text>
          )}
          <Button
            sizes="normal"
            loading={{ isLoading: loading }}
            disabled={isDisabledSubmit}
            onClick={() => handleSubmit({ bypassEmail: false })}
          >
            <IconSVG src={`${configs.CDN_APP_ICON_URL}/rocket.svg`} maxWidth="24" />
            {confirmBtnTitle}
          </Button>
        </S.FooterActions>
      </S.FooterView>
      {showVerifyEmail && (
        <EmailVerifier
          show={showVerifyEmail}
          onClose={() => {
            setShowVerifyEmail(false);
          }}
          onSuccess={async () => {
            await handleSubmit({
              bypassEmail: true,
            });
            setShowVerifyEmail(false);
          }}
        />
      )}

      {/* {showCustomizeTokenModal && (
        <CustomizeTokenModal
          show={showCustomizeTokenModal}
          onClose={() => {
            setShowCustomizeTokenModal(false);
          }}
          onSuccess={async () => {
            await handleSubmit({
              bypassEmail: true,
            });
            setShowVerifyEmail(false);
          }}
        />
      )} */}
    </>
  );
});

export default BuyPage;
