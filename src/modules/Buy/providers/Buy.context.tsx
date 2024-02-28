import { ModalsContext } from '@/contexts/modals.context';
import { WalletContext } from '@/contexts/wallet.context';
import useRouteHelper from '@/hooks/useRouterHelper';
import { IOrderBuyEstimateRespone, IOrderBuyReq } from '@/interface/services/client';
import { GAS_LITMIT, ServiceTypeEnum } from '@/modules/Account/Order/FormOrder.constants';
import client from '@/services/client';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { useFetchUserData, useIsAuthenticated } from '@/state/user/hooks';
import { userGamefiByAddressSelector } from '@/state/user/selector';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { debounce, isEmpty } from 'lodash';
import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  BitcoinValidityEnum,
  FormFieldsErrorMessage,
  FormFields,
  NativeTokenPayingGasEnum,
  NetworkEnum,
  PluginEnum,
} from '../Buy.constanst';
import { convertDayToSeconds, estimateDataFormater, getBuyBuilderStateInit, getChainIDRandom } from '../Buy.helpers';
import { IAvailableList, ItemDetail } from '../Buy.types';

export type IField = {
  value?: string;
  hasFocused?: boolean;
  hasError?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
};

export type FormFieldsType = {
  [key: string]: {
    value: string;
    hasFocused?: boolean;
    hasError?: boolean;
    isRequired?: boolean;
    errorMessage?: string;
  };
};

export type IFormDataCustomizeTokenType = {
  isError: boolean;
  data:
    | {
        totalSupply: string;
        receivingAddress: string;
        tickerName: string;
      }
    | undefined;
};

export type IBuyContext = {
  // Form Fields
  formFieldsManager: FormFieldsType;
  setFormFieldsManager: (value: FormFieldsType) => void;

  //
  validateField: (fieldName: string, value: string, errorMessage?: string) => Promise<any>;

  formDataCustomizeToken?: IFormDataCustomizeTokenType;
  setFormDataCustomizeToken: (data: IFormDataCustomizeTokenType) => void;

  // State
  availableListData?: IAvailableList;
  isAvailableListFetching?: boolean;
  estimateTotalCostFetching?: boolean;

  // --------------------------------------------------------------------------------
  // Form Fields
  // --------------------------------------------------------------------------------
  computerNameField: IField;
  setComputerNameField: (value: IField) => void;

  computerDescriptionField: IField;
  setComputerDescriptionField: (value: IField) => void;

  projectXField: IField;
  setProjectXField: (value: IField) => void;

  projectWebSiteField: IField;
  setProjectWebSiteField: (value: IField) => void;

  yourXField: IField;
  setYourXField: (value: IField) => void;

  yourTelegramField: IField;
  setYourTelegramField: (value: IField) => void;
  // --------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------

  networkSelected?: ItemDetail;
  setNetworkSelected: (value: ItemDetail) => void;

  rollupProtocolSelected?: ItemDetail;
  setRollupProtocolSelected: (value: ItemDetail) => void;

  bitcoinValiditySelected?: ItemDetail;
  setBitcoinValiditySelected: (value: ItemDetail) => void;

  dataValiditySelected?: ItemDetail;
  setDataValiditySelected: (value: ItemDetail) => void;

  blockTimeSelected?: ItemDetail;
  setBlockTimeSelected: (value: ItemDetail) => void;

  withdrawalPeriodSelected: number;
  setWithdrawalPeriodSelected: (value: number) => void;

  nativeTokenPayingGasSelected?: number;
  setNativeTokenPayingGasSelected: (value: number) => void;

  preInstallDAppSelected: number[];
  setPreInstallDAppSelected: (value: number[]) => void;

  // Other State
  isMainnet: boolean;
  chainIdRandom: number;
  estimateTotalCostData: IOrderBuyEstimateRespone | undefined;

  submitHandler: () => Promise<void>;
};

export const BuyContext = createContext<IBuyContext>({
  formFieldsManager: {},
  setFormFieldsManager: () => {},
  validateField: async () => {},

  setFormDataCustomizeToken: () => {},

  setNetworkSelected: () => {},
  setRollupProtocolSelected: () => {},
  setBitcoinValiditySelected: () => {},
  setDataValiditySelected: () => {},
  setBlockTimeSelected: () => {},
  setWithdrawalPeriodSelected: () => {},
  setNativeTokenPayingGasSelected: () => {},
  setPreInstallDAppSelected: () => {},

  submitHandler: async () => {},

  isMainnet: false,
  withdrawalPeriodSelected: 7,
  preInstallDAppSelected: [],

  chainIdRandom: 0,
  estimateTotalCostData: undefined,

  // ------------------------------------------------------------
  computerNameField: {},
  setComputerNameField: () => {},

  computerDescriptionField: {},
  setComputerDescriptionField: () => {},

  projectXField: {},
  setProjectXField: () => {},

  projectWebSiteField: {},
  setProjectWebSiteField: () => {},

  yourXField: {},
  setYourXField: () => {},

  yourTelegramField: {},
  setYourTelegramField: () => {},
  // ------------------------------------------------------------
});

export const BuyProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren): React.ReactElement => {
  const dispatch = useAppDispatch();
  // const { onSuccess } = props;
  const { goDashboardPage } = useRouteHelper();
  const isAuthenticated = useIsAuthenticated();
  const { onConnect } = useContext(WalletContext);
  const { account } = useWeb3React();
  const userGamefi = useAppSelector(userGamefiByAddressSelector)(account);
  const onFetchData = useFetchUserData();
  const { search } = useLocation();
  const { toggleContact } = useContext(ModalsContext);

  const urlParams = new URLSearchParams(search);
  const typeData = urlParams?.get('type')?.replace('/', '') || undefined;
  const builderStateInit = getBuyBuilderStateInit(typeData);
  // const [buyBuilderState, setBuyBuilderState] = useState<BuyBuilderSelectState>(builderStateInit);

  const [formDataCustomizeToken, setFormDataCustomizeToken] = useState<IFormDataCustomizeTokenType>({
    isError: true,
    data: undefined,
  });

  // ------------------------------------------------------------
  // Form Fields
  // ------------------------------------------------------------
  const [computerNameField, setComputerNameField] = useState<IField>({
    isRequired: true,
    errorMessage: FormFieldsErrorMessage[FormFields.COMPUTER_NAME],
  });

  const [computerDescriptionField, setComputerDescriptionField] = useState<IField>({
    isRequired: true,
    errorMessage: FormFieldsErrorMessage[FormFields.DESCRIPTION],
  });

  const [projectXField, setProjectXField] = useState<IField>({
    isRequired: true,
    errorMessage: FormFieldsErrorMessage[FormFields.PROJECT_X],
  });

  const [projectWebSiteField, setProjectWebSiteField] = useState<IField>({});

  const [yourXField, setYourXField] = useState<IField>({
    isRequired: true,
    errorMessage: FormFieldsErrorMessage[FormFields.YOUR_X_ACC],
  });

  const [yourTelegramField, setYourTelegramField] = useState<IField>({});

  // ------------------------------------------------------------
  // Local State
  // ------------------------------------------------------------
  const [formFieldsManager, setFormFieldsManager] = useState<FormFieldsType>({
    [FormFields.COMPUTER_NAME]: {
      isRequired: true,
      value: '',
      errorMessage: FormFieldsErrorMessage[FormFields.COMPUTER_NAME],
    },
    [FormFields.DESCRIPTION]: {
      isRequired: true,
      value: '',
      errorMessage: FormFieldsErrorMessage[FormFields.DESCRIPTION],
    },
    [FormFields.PROJECT_X]: {
      isRequired: true,
      value: '',
      errorMessage: FormFieldsErrorMessage[FormFields.PROJECT_X],
    },
    [FormFields.PROJECT_WEBSITE]: {
      value: '',
    },
    [FormFields.YOUR_X_ACC]: {
      isRequired: true,
      value: '',
      errorMessage: FormFieldsErrorMessage[FormFields.YOUR_X_ACC],
    },
    [FormFields.YOUR_TELEGRAM]: {
      value: '',
    },
    [FormFields.NETWORK]: {
      isRequired: true,
      value: '',
      errorMessage: FormFieldsErrorMessage[FormFields.NETWORK],
    },
    [FormFields.MIN_GAS_PRICE]: {
      isRequired: true,
      value: '',
      errorMessage: FormFieldsErrorMessage[FormFields.MIN_GAS_PRICE],
    },
    [FormFields.BLOCK_GAS_LIMIT]: {
      isRequired: true,
      value: String(GAS_LITMIT),
      errorMessage: FormFieldsErrorMessage[FormFields.BLOCK_GAS_LIMIT],
    },
  });

  const [networkSelected, setNetworkSelected] = useState<ItemDetail | undefined>(undefined);
  const [rollupProtocolSelected, setRollupProtocolSelected] = useState<ItemDetail | undefined>(undefined);
  const [bitcoinValiditySelected, setBitcoinValiditySelected] = useState<ItemDetail | undefined>(undefined);
  const [dataValiditySelected, setDataValiditySelected] = useState<ItemDetail | undefined>(undefined);
  const [blockTimeSelected, setBlockTimeSelected] = useState<ItemDetail | undefined>(undefined);
  const [withdrawalPeriodSelected, setWithdrawalPeriodSelected] = useState<number>(7);
  const [nativeTokenPayingGasSelected, setNativeTokenPayingGasSelected] = useState<number>(
    NativeTokenPayingGasEnum.NativeTokenPayingGas_BVM,
  );
  const [preInstallDAppSelected, setPreInstallDAppSelected] = useState<number[]>([PluginEnum.Plugin_Bridge]);
  const [chainIdRandom, setChainIdRandom] = useState<number>(0);

  // Modals
  const [showSubmitForm, setShowSubmitForm] = useState<boolean>(false);
  const [showSubmitFormResult, setShowSubmitFormResult] = useState<boolean>(false);

  // ------------------------------------------------------------
  // API DATA
  // ------------------------------------------------------------

  // AvailableList API Data
  const [availableListData, setAvailableListData] = useState<IAvailableList | undefined>(undefined);
  const [isAvailableListFetching, setAvailableListFetching] = useState(false);

  // EstimateFee API Data
  const [estimateTotalCostData, setEstimateTotalCostData] = useState<IOrderBuyEstimateRespone | undefined>(undefined);
  const [estimateTotalCostFetching, setEstimateTotalCostFetching] = useState(false);

  // ------------------------------------------------------------
  // Other State values
  // ------------------------------------------------------------
  const isMainnet = useMemo(() => !!(networkSelected?.value == NetworkEnum.Network_Mainnet), [networkSelected]);

  const orderBuyReq = useMemo(() => {
    const computerName = formFieldsManager[FormFields.COMPUTER_NAME].value || '';

    const finalizationPeriodSeconds = convertDayToSeconds(withdrawalPeriodSelected);
    const chainID = chainIdRandom;
    const chainName = computerName;
    const domain = computerName?.toLowerCase()?.trim().replaceAll(' ', '-');
    const blockTime = blockTimeSelected?.value || 10;
    const minGasPrice = new BigNumber(2).multipliedBy(1e9).toFixed();
    const bitcoinValidity = bitcoinValiditySelected?.value || BitcoinValidityEnum.BitcoinValidity_Ordinals;

    let params: IOrderBuyReq = {
      serviceType: ServiceTypeEnum.DEFAULT, // hard code
      domain: domain,
      chainId: String(chainID), // random
      chainName: chainName,
      description: '', // hard code
      finalizationPeriod: Math.ceil(finalizationPeriodSeconds),
      blockTime: Number(blockTime),
      minGasPrice: minGasPrice,
      dataAvaibilityChain: Number(dataValiditySelected?.value),
      isMainnet: isMainnet,
      userName: ((userGamefi || {}) as any)?.name || '',
      pluginIds: [PluginEnum.Plugin_Bridge],
      nativeTokenPayingGas: nativeTokenPayingGasSelected,
      gasLimit: GAS_LITMIT,
      bitcoinValidity: bitcoinValidity,
    };

    if (nativeTokenPayingGasSelected === NativeTokenPayingGasEnum.NativeTokenPayingGas_PreMint) {
      if (!formDataCustomizeToken.isError)
        params = {
          ...params,
          preMintAmount: new BigNumber(formDataCustomizeToken.data?.totalSupply || '0').multipliedBy(1e18).toFixed(),
          preMintAddress: formDataCustomizeToken.data?.receivingAddress,
          ticker: formDataCustomizeToken.data?.tickerName,
        };
    }

    return params;
  }, undefined);

  const validateField = async (fieldName: string, value: string, errorMessage = 'required') => {
    let isError = !value || value.length < 1;
    setFormFieldsManager({
      ...formFieldsManager,
      [fieldName]: {
        ...formFieldsManager[fieldName],
        hasFocused: true,
        hasError: isError,
        errorMessage: errorMessage,
      },
    });

    return isError;
  };

  const fetchAvailableList = async () => {
    try {
      setAvailableListFetching(true);
      const data = await client.fetchAvailableList();
      setAvailableListData(data);
    } catch (error) {
      setAvailableListData(undefined);
    } finally {
      setAvailableListFetching(false);
    }
  };

  const fetchEstimateTotalCost = async (orderBuyReq: IOrderBuyReq) => {
    try {
      setEstimateTotalCostFetching(true);
      const result = await client.estimateTotalCostAPI(orderBuyReq);
      setEstimateTotalCostData(estimateDataFormater(result));
    } catch (error) {
    } finally {
      setEstimateTotalCostFetching(false);
    }
  };

  const validateAllFormFields = async () => {
    let isValid = true;
    if (computerNameField.isRequired && isEmpty(computerNameField.value)) {
      isValid = false;
      setComputerNameField({ ...computerNameField, hasFocused: true, hasError: true });
    }
    if (computerDescriptionField.isRequired && isEmpty(computerDescriptionField.value)) {
      isValid = false;
      setComputerDescriptionField({ ...computerDescriptionField, hasFocused: true, hasError: true });
    }
    if (projectXField.isRequired && isEmpty(projectXField.value)) {
      isValid = false;
      setProjectXField({ ...projectXField, hasFocused: true, hasError: true });
    }
    if (yourXField.isRequired && isEmpty(yourXField.value)) {
      isValid = false;
      setYourXField({ ...yourXField, hasFocused: true, hasError: true });
    }
    return isValid;
  };

  const submitHandler = async () => {
    try {
      // if (!isAuthenticated) {
      //   return;
      // }
      if (!validateAllFormFields()) return;
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
      // const { message } = getErrorMessage(error);
      // toast.error(message);
    } finally {
      // setLoading(false);
    }
  };

  const confrimSubmitHandler = async () => {};

  const fetchEstimateTotalCostDebouce = useCallback(debounce(fetchEstimateTotalCost, 500), [orderBuyReq]);

  useEffect(() => {
    if (isMainnet) {
      fetchEstimateTotalCostDebouce(orderBuyReq);
    }
  }, [isMainnet, blockTimeSelected, dataValiditySelected, bitcoinValiditySelected, rollupProtocolSelected]);

  useEffect(() => {
    fetchAvailableList();
  }, []);

  useEffect(() => {
    const getChainIDRandomFunc = async () => {
      try {
        const newChainId = await getChainIDRandom();
        setChainIdRandom(newChainId);
      } catch (error) {}
    };
    getChainIDRandomFunc();
  }, []);

  const values = {
    // --------------------------------------------------------------------------------------
    computerNameField,
    setComputerNameField,

    computerDescriptionField,
    setComputerDescriptionField,

    projectXField,
    setProjectXField,

    projectWebSiteField,
    setProjectWebSiteField,

    yourXField,
    setYourXField,

    yourTelegramField,
    setYourTelegramField,

    // --------------------------------------------------------------------------------------

    availableListData,
    isAvailableListFetching,

    estimateTotalCostData,
    setEstimateTotalCostData,
    estimateTotalCostFetching,

    formDataCustomizeToken,
    setFormDataCustomizeToken,

    formFieldsManager,
    setFormFieldsManager,

    validateField,

    networkSelected,
    setNetworkSelected,

    rollupProtocolSelected,
    setRollupProtocolSelected,

    bitcoinValiditySelected,
    setBitcoinValiditySelected,

    dataValiditySelected,
    setDataValiditySelected,

    blockTimeSelected,
    setBlockTimeSelected,

    withdrawalPeriodSelected,
    setWithdrawalPeriodSelected,

    nativeTokenPayingGasSelected,
    setNativeTokenPayingGasSelected,

    preInstallDAppSelected,
    setPreInstallDAppSelected,

    isMainnet,
    chainIdRandom,
    orderBuyReq,

    submitHandler,
  };

  console.log('[DEBUG] Buy Provider ALL DATA: ', values);

  return <BuyContext.Provider value={values}>{children}</BuyContext.Provider>;
};
