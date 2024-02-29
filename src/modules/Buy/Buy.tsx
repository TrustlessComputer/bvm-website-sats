import SectionImage from '@/assets/images/robot_build.png';
import { SupportedChainId } from '@/chains';
import Button from '@/components/Button';
import { EmailVerifier } from '@/components/EmailVerifier';
import IconSVG from '@/components/IconSVG';
import { Row } from '@/components/Row';
import { Spinner } from '@/components/Spinner';
import Text from '@/components/Text';
import { TextInput2 } from '@/components/TextInput/TextInput2';
import configs from '@/configs';
import { ModalsContext } from '@/contexts/modals.context';
import { WalletContext } from '@/contexts/wallet.context';
import useRouteHelper from '@/hooks/useRouterHelper';
import { IOrderBuyEstimateRespone, IOrderBuyReq } from '@/interface/services/client';
import { Image } from '@/modules/Wellcome/styled';
import client, { SubmitFormParams } from '@/services/client';
import { useAppSelector } from '@/state/hooks';
import { useFetchUserData, useIsAuthenticated } from '@/state/user/hooks';
import { accountInfoSelector, userGamefiByAddressSelector } from '@/state/user/selector';
import { getErrorMessage } from '@/utils';
import formatter from '@/utils/amount';
import sleep from '@/utils/sleep';
import { useWeb3React } from '@web3-react/core';
import { Radio, Slider } from 'antd';
import BigNumber from 'bignumber.js';
import { debounce, throttle, trim } from 'lodash';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MessageCircle } from 'react-feather';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { GAS_LITMIT, MIN_GAS_PRICE, ServiceTypeEnum } from '../Account/Order/FormOrder.constants';
import { getUser } from './Buy.TwitterUtil';
import {
  DALayerEnum,
  FormErrorMessage,
  NativeTokenPayingGasEnum,
  NetworkEnum,
  PluginEnum,
  PluginTypeEnum,
  RollupEnum,
  BitcoinValidityEnum,
  NetworkEnumMap,
  RollupEnumMap,
  DALayerEnumMap,
} from './Buy.constanst';
import {
  convertDayToSeconds,
  dayDescribe,
  getBuyBuilderStateInit,
  getChainIDRandom,
  getRandonComputerName,
} from './Buy.helpers';
import { BuyBuilderSelectState, BuyDataBuilder, ItemDetail, SectionProps } from './Buy.types';
import CustomizeTokenView from './CustomizeTokenView';
import Item from './components/Item';
import Section from './components/Section';
import Segment from './components/Segment';
import Title from './components/Title';
import * as S from './styled';
import SubmitFormModal from './SubmitFormModal';
import SubmitResultFormModal from './SubmitResultFormModal';
import { ErrorMessage } from 'formik';
import { TextArea } from '@/components/TextInput/TextArea';

type Props = {
  onSuccess?: () => void;
};

const BuyPage = React.memo((props: Props) => {
  const { onSuccess } = props;
  const { goDashboardPage, requiredLogin } = useRouteHelper();
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

  const [showSubmitForm, setShowSubmitForm] = useState<boolean>(false);
  const [showSubmitFormResult, setShowSubmitFormResult] = useState<boolean>(false);

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

  const [networkErrorMessage, setNetworkErrorMessage] = useState<string | undefined>(undefined);
  const [networkFocused, setNetworkFocused] = useState<boolean>(false);

  const [subdomainErrorMessage, setSubdomainErrorMessage] = useState<string | undefined>(undefined);
  const [subdomainFocused, setSubdomainFocused] = useState<boolean>(false);

  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState<string | undefined>(undefined);
  const [descriptionFocused, setDescriptionFocused] = useState<boolean>(false);

  const [projectXAccountErrorMessage, setProjectXAccountErrorMessage] = useState<string | undefined>(undefined);
  const [projectXAccountFocused, setProjectXAccountFocused] = useState<boolean>(false);

  const [yourXAccountErrorMessage, setYourXAccountErrorMessage] = useState<string | undefined>(undefined);
  const [yourXAccountFocused, settYourXAccountFocused] = useState<boolean>(false);
  // const [yourTelegramErrorMessage, setYourTelegramErrorMessage] = useState<string | undefined>(undefined);

  const [minGasPriceErrorMessage, setMinGasPriceErrorMessage] = useState<string | undefined>(undefined);
  const [gasLimitErrorMessage, setGasLimitErrorMessage] = useState<string | undefined>(undefined);

  const [isTotalCostFetching, setTotalCostFetching] = useState<boolean>(false);
  const [chainIDRandom, setChainIDRandom] = useState<number | undefined>(undefined);

  const [data, setData] = useState<BuyDataBuilder | undefined>(undefined);
  const [buyBuilderState, setBuyBuilderState] = useState<BuyBuilderSelectState>(builderStateInit);

  const [estimateData, setEstimateData] = useState<IOrderBuyEstimateRespone | undefined>(undefined);

  console.log('SALE rollupProtocol: ', typeof data?.rollupProtocol);
  console.log('SALE buyBuilderState: ', buyBuilderState.rollupProtocol);

  console.log('DEBUG : ', {
    buyBuilderState,
    data,
  });

  const isMainnet = useMemo(() => {
    return buyBuilderState.network === NetworkEnum.Network_Mainnet;
  }, [buyBuilderState.network]);

  const confirmBtnTitle = useMemo(() => {
    if (isMainnet) {
      return 'Submit';
    } else if (!isAuthenticated) {
      return 'Connect Wallet';
    } else {
      return 'Submit';
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
    // setBuyBuilderState({
    //   ...buyBuilderState,
    //   chainName: getRandonComputerName(isMainnet),
    // });
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
        const bitcoinValidity = buyBuilderState.bitcoinValidity || BitcoinValidityEnum.BitcoinValidity_Ordinals;

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
          gasLimit: GAS_LITMIT,
          bitcoinValidity: bitcoinValidity,
        };
        // console.log('CREATE ORDER BUY params ==>> ', params);

        const result = await client.orderBuyEstimateAPI(params);
        setEstimateData(result);
      } catch (error) {
        const { message } = getErrorMessage(error);
        toast.error(message);
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
    }
  }, [buyBuilderState, isMainnet]);

  const isDisabledSubmit = useMemo(() => {
    return (
      loading ||
      isTyping ||
      !!subdomainErrorMessage ||
      !!descriptionErrorMessage ||
      !!projectXAccountErrorMessage ||
      !!minGasPriceErrorMessage ||
      !!gasLimitErrorMessage
    );
  }, [loading, isTyping, buyBuilderState]);

  const estimateDataFormatted = useMemo(() => {
    let result = {
      SetupCode: '0',
      OperationCost: '0',
      RollupCost: '0',
      TotalCost: '0',
    };
    if (!estimateData) {
      return result;
    } else {
      let setupCodeFomatted = `${formatter.formatAmount({
        originalAmount: Number(estimateData.SetupCode || '0'),
        decimals: 18,
        maxDigits: 2,
        isCeil: true,
      })}`;

      let operationCostFomatted = `${formatter.formatAmount({
        originalAmount: Number(estimateData.OperationCost || '0'),
        decimals: 18,
        maxDigits: 2,
        isCeil: true,
      })}`;

      let rollupCostFomatted = `${formatter.formatAmount({
        originalAmount: Number(estimateData.RollupCost || '0'),
        decimals: 18,
        maxDigits: 2,
        isCeil: true,
      })}`;

      let totalCostFomatted = `${formatter.formatAmount({
        originalAmount: Number(estimateData.TotalCost || '0'),
        decimals: 18,
        maxDigits: 2,
        isCeil: true,
      })}`;

      result.SetupCode = setupCodeFomatted;
      result.OperationCost = operationCostFomatted;
      result.RollupCost = rollupCostFomatted;
      result.TotalCost = totalCostFomatted;
      return result;
    }
  }, [estimateData]);

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
            const contentValue = item.value === NetworkEnum.Network_Mainnet ? item.price : 'Free Trial';
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
                    setNetworkErrorMessage(undefined);
                    setNetworkFocused(true);
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
        {networkErrorMessage && networkFocused && !isTyping && (
          <Text size="14" fontWeight="regular" color="negative" style={{ marginTop: '5px' }}>
            {networkErrorMessage}
          </Text>
        )}
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

  const renderBitcoinValiditySection = (props: SectionProps) => {
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
                  isSelected={item.value === buyBuilderState.bitcoinValidity}
                  disabled={item.value === valueDisabled}
                  title={item.valueStr}
                  content={privaeValue}
                  priceNote={item.priceNote}
                  onClickCallback={value => {
                    setBuyBuilderState({
                      ...buyBuilderState,
                      bitcoinValidity: value,
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

    const dataList: ItemDetail[] =
      dataListBasedNetwork[buyBuilderState.dataAvaibilityChain] || dataListBasedNetwork[DALayerEnum.DALayer_BTC];
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
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
            }}
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
        <S.Space />
      </Section>
    );
  };

  const renderGasLimitSection = (props: SectionProps) => {
    const { title = '', desc = '', sectionType, valueDisabled, data, descriptionDetail } = props;
    return (
      <Section title={title} description={desc} descriptionDetail={descriptionDetail}>
        <S.Space />
        <S.Section>
          <TextInput2
            placeholder=""
            id={'MinGasPrice-ID'}
            value={buyBuilderState.gasLimit}
            onBlur={e => {
              onChangeGasLimitPriceHandler(e.target.value);
            }}
            onChange={e => {
              const value = e.target.value;
              setBuyBuilderState({
                ...buyBuilderState,
                gasLimit: value,
              });
              onChangeGasLimitPriceHandler(value);
            }}
            type="number"
            step={'any'}
            autoComplete="off"
            autoFocus={false}
            spellCheck={false}
            onWheel={(e: any) => e?.target?.blur()}
          />
          {gasLimitErrorMessage && !isTyping && (
            <Text size="14" fontWeight="regular" color="negative">
              {gasLimitErrorMessage}
            </Text>
          )}
        </S.Section>
        <S.Space />
      </Section>
    );
  };

  const onChangeComputerNameHandler = useCallback(
    debounce(async (text: string) => {
      if (!validateComputerName(text)) {
        setTyping(false);
      } else {
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

  const onChangeDescriptionHandler = useCallback(
    debounce(async (text: string) => {
      if (!validateDescription(text)) {
        setTyping(false);
      } else {
        setDescriptionErrorMessage(undefined);
      }
    }, 100),
    [],
  );

  const onChangeProjectXHandler = useCallback(
    debounce(async (text: string) => {
      if (!validateProjectX(text)) {
        setTyping(false);
      } else {
        setProjectXAccountErrorMessage(undefined);
      }
    }, 100),
    [],
  );

  const onChangeYourXAccountHandler = useCallback(
    debounce(async (text: string) => {
      if (!validateYourXAccount(text)) {
        setTyping(false);
      } else {
        setYourXAccountErrorMessage(undefined);
      }
    }, 100),
    [],
  );

  // const onChangeYourTelegramHandler = useCallback(
  //   debounce(async (text: string) => {
  //     if (!text || text.length < 1) {
  //       setYourTelegramErrorMessage('Your telegram is required.');
  //       setTyping(false);
  //     } else {
  //       setYourTelegramErrorMessage(undefined);
  //     }
  //   }, 100),
  //   [],
  // );

  const onChangeGasPriceHandler = (text: string) => {
    if (!text || text.length < 1) {
      setMinGasPriceErrorMessage('Min gas price is required.');
    } else if (Number(text) < MIN_GAS_PRICE) {
      setMinGasPriceErrorMessage(`Min gas price must be at least ${MIN_GAS_PRICE} Gwei.`);
    } else {
      setMinGasPriceErrorMessage(undefined);
    }
  };

  const onChangeGasLimitPriceHandler = (text: string) => {
    if (!text || text.length < 1) {
      setGasLimitErrorMessage('Min gas litmit is required.');
    } else {
      setGasLimitErrorMessage(undefined);
    }
  };

  const renderComputerName = () => {
    return (
      <S.Section>
        <Title text={'Bitcoin L2 Name'} />
        <S.Space />
        <TextInput2
          placeholder=""
          id={'ComputerName-ID'}
          name={'FormFields.chainName'}
          value={buyBuilderState.chainName}
          onBlur={e => {
            onChangeComputerNameHandler(e.target.value);
          }}
          onFocus={e => {
            setSubdomainFocused(true);
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
          autoFocus={false}
          onWheel={(e: any) => e?.target?.blur()}
        />
        {subdomainErrorMessage && subdomainFocused && !isTyping && (
          <Text size="14" fontWeight="regular" color="negative" style={{ marginTop: '5px' }}>
            {subdomainErrorMessage}
          </Text>
        )}
      </S.Section>
    );
  };

  const renderDescription = () => {
    return (
      <S.Section>
        <Title text={'Bitcoin L2 description'} />
        <S.Space />
        <TextArea
          placeholder="Tell us more about your plan with your Bitcoin L2"
          id={'ComputerDescription-ID'}
          name={'FormFields.computerDescription'}
          value={buyBuilderState.description}
          onBlur={e => {
            onChangeDescriptionHandler(e.target.value);
          }}
          onFocus={e => {
            setDescriptionFocused(true);
          }}
          onChange={e => {
            const description = e.target.value;
            setBuyBuilderState({
              ...buyBuilderState,
              description: description,
            });
            onChangeDescriptionHandler(description);
          }}
          spellCheck={false}
          autoFocus={false}
          onWheel={(e: any) => e?.target?.blur()}
        />
        {descriptionErrorMessage && descriptionFocused && !isTyping && (
          <Text size="14" fontWeight="regular" color="negative" style={{ marginTop: '5px' }}>
            {descriptionErrorMessage}
          </Text>
        )}
      </S.Section>
    );
  };

  const renderProjectInformation = () => {
    return (
      <S.Section>
        <Title text={'Project information'} />
        <S.Space />
        <TextInput2
          placeholder="Project X account link/handle"
          id={'ProjectInformation-ID'}
          name={'FormFields.projectInformation'}
          value={buyBuilderState.projectXAccount}
          onBlur={e => {
            onChangeProjectXHandler(e.target.value);
          }}
          onChange={e => {
            const text = e.target.value;
            setBuyBuilderState({
              ...buyBuilderState,
              projectXAccount: text,
            });
            onChangeProjectXHandler(text);
          }}
          type="text"
          step={'any'}
          autoComplete="off"
          spellCheck={false}
          autoFocus={false}
          onWheel={(e: any) => e?.target?.blur()}
        />
        {projectXAccountErrorMessage && projectXAccountFocused && !isTyping && (
          <Text size="14" fontWeight="regular" color="negative" style={{ marginTop: '5px' }}>
            {projectXAccountErrorMessage}
          </Text>
        )}
        <TextInput2
          placeholder="Project website"
          id={'ProjectWebsite-ID'}
          name={'FormFields.projectWebsite'}
          value={buyBuilderState.projectWebsite}
          onBlur={e => {}}
          onChange={e => {
            const text = e.target.value;
            setBuyBuilderState({
              ...buyBuilderState,
              projectWebsite: text,
            });
          }}
          type="text"
          step={'any'}
          autoComplete="off"
          style={{
            marginTop: '20px',
          }}
          spellCheck={false}
          autoFocus={false}
          onWheel={(e: any) => e?.target?.blur()}
        />
      </S.Section>
    );
  };

  const rendeContactInformation = () => {
    return (
      <S.Section>
        <Title text={'Contact information'} />
        <S.Space />
        <TextInput2
          placeholder="Your X account link/handle"
          id={'YourXAccount-ID'}
          name={'FormFields.yourXAccount'}
          value={buyBuilderState.yourXAccount}
          onBlur={e => {
            onChangeYourXAccountHandler(e.target.value);
          }}
          onChange={e => {
            const text = e.target.value;
            setBuyBuilderState({
              ...buyBuilderState,
              yourXAccount: text,
            });
            onChangeYourXAccountHandler(text);
          }}
          type="text"
          step={'any'}
          autoComplete="off"
          spellCheck={false}
          autoFocus={false}
          onWheel={(e: any) => e?.target?.blur()}
        />
        {yourXAccountErrorMessage && yourXAccountFocused && !isTyping && (
          <Text size="14" fontWeight="regular" color="negative" style={{ marginTop: '5px' }}>
            {yourXAccountErrorMessage}
          </Text>
        )}

        <TextInput2
          placeholder="Your telegram link/handle"
          id={'YourTelegram-ID'}
          name={'FormFields.yourTelegram'}
          value={buyBuilderState.yourTelegramAccount}
          onBlur={e => {
            // onChangeYourTelegramHandler(e.target.value);
          }}
          onChange={e => {
            const text = e.target.value;
            setBuyBuilderState({
              ...buyBuilderState,
              yourTelegramAccount: text,
            });
            // onChangeYourTelegramHandler(text);
          }}
          type="text"
          step={'any'}
          autoComplete="off"
          spellCheck={false}
          autoFocus={false}
          style={{
            marginTop: '20px',
          }}
          onWheel={(e: any) => e?.target?.blur()}
        />
        {/* {yourTelegramErrorMessage && !isTyping && (
          <Text size="14" fontWeight="regular" color="negative" style={{ marginTop: '5px' }}>
            {yourTelegramErrorMessage}
          </Text>
        )} */}
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

  const validateComputerName = (text: string) => {
    let isValid = true;
    if (!text || text.length < 1) {
      isValid = false;
      setSubdomainErrorMessage(FormErrorMessage.computerName);
    } else {
      setSubdomainErrorMessage(undefined);
    }
    setSubdomainFocused(true);
    return isValid;
  };

  const validateDescription = (text: string) => {
    let isValid = true;
    if (!text || text.length < 1) {
      isValid = false;
      setDescriptionErrorMessage(FormErrorMessage.description);
    } else {
      setDescriptionErrorMessage(undefined);
    }
    setDescriptionFocused(true);
    return isValid;
  };

  const validateNetwork = () => {
    let isValid = true;
    if (buyBuilderState.network === NetworkEnum.Network_UNKNOW) {
      isValid = false;
      setNetworkErrorMessage(FormErrorMessage.network);
    } else {
      setNetworkErrorMessage(undefined);
    }
    setNetworkFocused(true);
    return isValid;
  };

  const validateProjectX = (text: string) => {
    let isValid = true;
    if (!text || text.length < 1) {
      isValid = false;
      setProjectXAccountErrorMessage(FormErrorMessage.projectX);
    } else {
      setProjectXAccountErrorMessage(undefined);
    }
    setProjectXAccountFocused(true);
    return isValid;
  };

  const validateYourXAccount = (text: string) => {
    let isValid = true;
    if (!text || text.length < 1) {
      isValid = false;
      setYourXAccountErrorMessage(FormErrorMessage.yourXAccount);
    } else {
      setYourXAccountErrorMessage(undefined);
    }
    settYourXAccountFocused(true);
    return isValid;
  };

  const checkValidateForm = () => {
    let isValid = true;
    const { chainName, description, projectXAccount, yourXAccount } = buyBuilderState;

    // Computer Name
    if (!validateComputerName(chainName)) {
      isValid = false;
    }

    // Description
    if (!validateDescription(description)) {
      isValid = false;
    }

    // Network
    if (!validateNetwork()) {
      isValid = false;
    }

    //Project X
    if (!validateProjectX(projectXAccount)) {
      isValid = false;
    }

    //Project X
    if (!validateYourXAccount(yourXAccount)) {
      isValid = false;
    }

    return isValid;
  };

  const handeSubmitForm = async () => {
    const params: SubmitFormParams = {
      bitcoinL2Name: buyBuilderState.chainName,
      bitcoinL2Description: buyBuilderState.description,
      network: NetworkEnumMap[buyBuilderState.network],
      dataAvailability: DALayerEnumMap[buyBuilderState.dataAvaibilityChain],
      blockTime: buyBuilderState.blockTime + 's',
      rollupProtocol: RollupEnumMap[buyBuilderState.rollupProtocol],
      withdrawPeriod: `${dayDescribe(buyBuilderState.withdrawPeriod).str}`,
      twName: buyBuilderState.yourXAccount,
      telegram: buyBuilderState.projectXAccount,
    };
    try {
      await client.submitContactVS2(params);
      setShowSubmitFormResult(true);
    } catch (error) {
      const { message } = getErrorMessage(error);
      toast.error(message);
    } finally {
      setShowSubmitForm(false);
    }
  };

  const handleSubmit = throttle(
    async ({ bypassEmail }: { bypassEmail: boolean }) => {
      try {
        if (!isAuthenticated) {
          // const isSuccess = await onConnect(SupportedChainId.NOS);
          // if (!isSuccess) {
          //   return setLoading(false);
          // }

          parent.postMessage(
            JSON.stringify({
              name: 'trustless-computer-change-route',
              url: '/bvm-website-sats-iframe/price',
              message: 'hehhe',
            }),
            '*',
          );

          requiredLogin();

          return;
        }

        if (!checkValidateForm()) return;

        // if (subdomainErrorMessage || gasLimitErrorMessage || isTyping || !buyBuilderState.chainName) return;

        if (isMainnet) {
          // return setShowVerifyEmail(true);/
          //SHOW FORM CONTACT US!
          // return setShowContacUseForm(true);
          // toggleContact();

          //Google Form
          // window.open('https://forms.gle/eUbL7nHuTPA3HLRz8', '_blank');

          setShowSubmitForm(true);
          return;
        } else {
          // if (!accountInfo?.emailVerified && !bypassEmail) {
          //   return setShowVerifyEmail(true);
          // }
          setShowSubmitForm(true);
          return;
        }

        // setLoading(true);

        // const finalizationPeriodSeconds = convertDayToSeconds(buyBuilderState.withdrawPeriod);
        // const chainID = chainIDRandom ?? (await getChainIDRandom());
        // const chainName = buyBuilderState.chainName;
        // const domain = buyBuilderState.chainName?.toLowerCase()?.trim().replaceAll(' ', '-');
        // const blockTime = buyBuilderState.blockTime;
        // const minGasPrice = new BigNumber(2).multipliedBy(1e9).toFixed();
        // const dataAvaibilityChain = buyBuilderState.dataAvaibilityChain;
        // const gasLimit = buyBuilderState.gasLimit;
        // const bitcoinValidity = buyBuilderState.bitcoinValidity;

        // const twitterAccessToken = parent?.localStorage?.getItem('TWITTER_TOKEN');
        // let twitterID;
        // let userTwitterInfor;

        // if (twitterAccessToken && twitterAccessToken.length > 0) {
        //   userTwitterInfor = await getUser(twitterAccessToken);
        //   twitterID = userTwitterInfor?.twitter_id;
        // }

        // let params: IOrderBuyReq = {
        //   serviceType: ServiceTypeEnum.DEFAULT, //hard code
        //   domain: domain,
        //   chainId: String(chainID), //random
        //   chainName: chainName,
        //   description: '', //hard code
        //   finalizationPeriod: Math.ceil(finalizationPeriodSeconds),
        //   blockTime: Number(blockTime),
        //   minGasPrice: minGasPrice,
        //   dataAvaibilityChain: Number(dataAvaibilityChain),
        //   isMainnet: isMainnet,
        //   userName: ((userGamefi || {}) as any)?.name || '',
        //   pluginIds: [PluginEnum.Plugin_Bridge],
        //   nativeTokenPayingGas: paymentTransactionGas,
        //   gasLimit: Number(gasLimit || GAS_LITMIT),
        //   twitter_id: twitterID,
        //   bitcoinValidity: bitcoinValidity,
        // };

        // if (paymentTransactionGas === NativeTokenPayingGasEnum.NativeTokenPayingGas_PreMint) {
        //   if (formDataCustomizeToken.isError) return;
        //   else
        //     params = {
        //       ...params,
        //       preMintAmount: new BigNumber(formDataCustomizeToken.data?.totalSupply || '0')
        //         .multipliedBy(1e18)
        //         .toFixed(),
        //       preMintAddress: formDataCustomizeToken.data?.receivingAddress,
        //       ticker: formDataCustomizeToken.data?.tickerName,
        //     };
        // }

        // console.log('DEBUG [handleSubmit] params: ', params);

        // const result = await client.orderBuyAPI(params);
        // await sleep(2);
        // if (result) {
        //   onFetchData();
        //   await sleep(1);
        //   toast.success('Order successful', {
        //     duration: 1000,
        //   });
        //   goDashboardPage(params.isMainnet, true);
        // }
        // onSuccess && onSuccess();
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
                  Have questions about Bitcoin L2?
                </Text>
                <Text size="12" align="center" className="discord">
                  <a href={configs.TELEGRAM_TRUSTLESS_URL} target="_blank">
                    Chat with us via Telegram
                  </a>
                </Text>
              </div>
            </Row>
          </div>
        </S.LeftContainer>
        <S.RightContainer>
          <Text size="32" fontWeight="semibold" align="left" className="header">
            Customize your Bitcoin L2
          </Text>
          <Text size="20" fontWeight="regular" align="left" className="header">
            Bitcoin L2s are secure, low-cost, and lightning-fast L2 blockchains — fully loaded with DEX, DAO, NFT
            marketplace, and the whole shebang!
          </Text>
          <div className="sectionList">
            {/* Computer Name */}
            {renderComputerName()}

            {/* Computer Description  */}
            {renderDescription()}

            {/* Project Information  */}
            {renderProjectInformation()}

            {/* Contact information  */}
            {rendeContactInformation()}

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

            {/* Bitcoin Validity */}
            {data?.bitcoinValidity &&
              renderBitcoinValiditySection({
                title: 'Bitcoin Validity',
                desc: 'Which Bitcoin Validity is right for you?',
                data: data.bitcoinValidity,
                sectionType: 'bitcoinValidity',
                descriptionDetail: undefined,
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
                desc: 'How fast do you want your Bitcoin L2 to go?',
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
                    within your Bitcoin L2 must be set to a value higher than or equal to the one you choose.
                  </p>
                ),
              },
            })}

            {/* Gas Limit */}
            {renderGasLimitSection({
              title: 'Block gas limit',
              desc: 'Which block gas limit is right for you?',
              data: data.gasLimit,
              sectionType: 'gasLimit',
              descriptionDetail: undefined,
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
                desc: 'Which native token is right for you?',
                data: data.nativeTokenPayingGas,
                sectionType: 'nativeTokenPayingGas',
                descriptionDetail: undefined,
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
              Bitcoin L2
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
        {!isMainnet ? (
          <S.FooterActions>
            <Text size="26" fontWeight="semibold" align="left" className="cost">
              {'Free'}
            </Text>
            <Button
              sizes="normal"
              loading={{ isLoading: loading }}
              // disabled={isDisabledSubmit}
              onClick={() => handleSubmit({ bypassEmail: false })}
            >
              <IconSVG src={`${configs.CDN_APP_ICON_URL}/rocket.svg`} maxWidth="24" />
              {confirmBtnTitle}
            </Button>
          </S.FooterActions>
        ) : (
          <S.FooterActions2>
            <Row align="center">
              <IconSVG maxWidth="28" src={`${configs.CDN_APP_ICON_URL}/ic-computer.svg`} className="mr-8" />
              <Text size="18" fontWeight="semibold">
                Service costs
              </Text>
            </Row>
            <Row gap={42}>
              <div className="grid-content">
                <Text size="16">
                  <span>• Setup cost: </span>
                  {estimateDataFormatted?.SetupCode || '0'}
                </Text>
                <Text size="16">
                  <span>• Operation cost: </span>
                  {estimateDataFormatted?.OperationCost || '0'}
                </Text>
                <Text size="16">
                  <span>• Rollup cost: </span>
                  {estimateDataFormatted?.RollupCost || '0'}
                </Text>
              </div>
              <S.BreakLine></S.BreakLine>
            </Row>
            <S.RowActionInfor>
              {isTotalCostFetching ? (
                <Spinner size={24} />
              ) : (
                <Text size="26" fontWeight="semibold" align="left" className="cost">
                  {`Total: ${estimateDataFormatted?.TotalCost} BVM`}
                </Text>
              )}
              <Button
                sizes="normal"
                loading={{ isLoading: loading }}
                // disabled={isDisabledSubmit}
                onClick={() => handleSubmit({ bypassEmail: false })}
              >
                <IconSVG src={`${configs.CDN_APP_ICON_URL}/rocket.svg`} maxWidth="24" />
                {confirmBtnTitle}
              </Button>
            </S.RowActionInfor>
          </S.FooterActions2>
        )}
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

      {showSubmitForm && (
        <SubmitFormModal
          show={showSubmitForm}
          data={{
            networkName: buyBuilderState.chainName,
            network: NetworkEnumMap[buyBuilderState.network],
            blockTime: buyBuilderState.blockTime + 's',
            rollupProtocol: RollupEnumMap[buyBuilderState.rollupProtocol],
            withdrawalPeriod: `${dayDescribe(buyBuilderState.withdrawPeriod).str}`,
            twitter: buyBuilderState.yourXAccount,
            telegram: buyBuilderState.yourTelegramAccount,
            projectXAccount: buyBuilderState.projectXAccount,
            projectWebsite: buyBuilderState.projectWebsite,
          }}
          onClose={() => {
            setShowSubmitForm(false);
          }}
          onSuccess={async () => {
            // TO DO
            handeSubmitForm();
          }}
        />
      )}

      {showSubmitFormResult && (
        <SubmitResultFormModal
          show={showSubmitFormResult}
          onClose={() => {
            setShowSubmitFormResult(false);
          }}
          onSuccess={async () => {
            // TO DO
          }}
        />
      )}
    </>
  );
});

export default BuyPage;
