import { IOrderBuyEstimateRespone } from '@/interface/services/client';
import { BitcoinValidityEnum, BlockTimeEnum, DALayerEnum, NetworkEnum, RollupEnum } from '../Buy.constanst';
import { IAvailableList } from '../Buy.types';
import { SubmitFormParams } from '@/services/client';

export type IField = {
  value?: string;
  hasFocused?: boolean;
  hasError?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
};

export type ComputerNameSection = {
  computerNameField: IField;
  setComputerNameField: (value: IField) => void;
};

export type ComputerDescriptionSection = {
  computerDescriptionField: IField;
  setComputerDescriptionField: (value: IField) => void;
};

export type ProjectInforSection = {
  projectXField: IField;
  setProjectXField: (value: IField) => void;

  projectWebSiteField: IField;
  setProjectWebSiteField: (value: IField) => void;
};

export type MinGasPriceSection = {
  minGasPriceField: IField;
  setMinGasPriceField: (value: IField) => void;
};

export type BlockGasLimitSection = {
  blockGasLimitField: IField;
  setBlockGasLimitField: (value: IField) => void;
};

export type ContactInforSection = {
  yourXField: IField;
  setYourXField: (value: IField) => void;

  yourTelegramField: IField;
  setYourTelegramField: (value: IField) => void;
};

export type NetworkSection = {
  networkSelected?: NetworkEnum;
  setNetworkSelected: (value: NetworkEnum) => void;
};

export type RollupProtocolSection = {
  rollupProtocolSelected?: RollupEnum;
  setRollupProtocolSelected: (value: RollupEnum) => void;
};

export type BitcoinValiditySection = {
  bitcoinValiditySelected?: BitcoinValidityEnum;
  setBitcoinValiditySelected: (value: BitcoinValidityEnum) => void;
};

export type DataValiditySection = {
  dataValiditySelected?: DALayerEnum;
  setDataValiditySelected: (value: DALayerEnum) => void;
};

export type BlockTimeSection = {
  blockTimeSelected?: BlockTimeEnum;
  setBlockTimeSelected: (value: BlockTimeEnum) => void;
};

export type WithdrawalPeriodSection = {
  withdrawalPeriodSelected: number;
  setWithdrawalPeriodSelected: (value: number) => void;
};

export type NativeTokenPayingGasSection = {
  nativeTokenPayingGasSelected?: number;
  setNativeTokenPayingGasSelected: (value: number) => void;
};

export type PreInstallDAppSection = {
  preInstallDAppSelected: number[];
  setPreInstallDAppSelected: (value: number[]) => void;
};

// Custom Native Token --- Fields

export type CustomNativeTokenSection = {
  tickerField: IField;
  setTickerField: (value: IField) => void;

  totalSupplyField: IField;
  setTotalSupplyField: (value: IField) => void;

  receivingAddressField: IField;
  setReceivingAddressField: (value: IField) => void;
};

// --------------------------------------------------------------------------------
// Context Values
// --------------------------------------------------------------------------------
export type IBuyContext = ComputerNameSection &
  ComputerDescriptionSection &
  ProjectInforSection &
  ContactInforSection &
  NetworkSection &
  RollupProtocolSection &
  BitcoinValiditySection &
  DataValiditySection &
  BlockTimeSection &
  WithdrawalPeriodSection &
  MinGasPriceSection &
  BlockGasLimitSection &
  NativeTokenPayingGasSection &
  PreInstallDAppSection &
  CustomNativeTokenSection & {
    // Data API
    availableListData?: IAvailableList;
    isAvailableListFetching?: boolean;

    estimateTotalCostData: IOrderBuyEstimateRespone | undefined;
    estimateTotalCostFetching?: boolean;

    // Other State
    isMainnet: boolean;
    chainIdRandom: number;
    confirmBtnTitle?: string;
    isAuthenticated: boolean;
    submiting?: boolean;
    confirmSubmiting?: boolean;
    showSubmitForm: boolean;
    setShowSubmitForm: (value: boolean) => void;

    isSubmiting: boolean;
    setSubmiting: (value: boolean) => void;

    showSubmitFormResult: boolean;
    setShowSubmitFormResult: (value: boolean) => void;

    // Action
    submitHandler: (onSuccess?: any) => Promise<void>;
    confirmSubmitHandler: () => Promise<void>;

    submitFormParams: SubmitFormParams | undefined;
  };

export const BuyContextInit: IBuyContext = {
  setNetworkSelected: () => {},
  setRollupProtocolSelected: () => {},
  setBitcoinValiditySelected: () => {},
  setDataValiditySelected: () => {},
  setBlockTimeSelected: () => {},
  setWithdrawalPeriodSelected: () => {},
  setNativeTokenPayingGasSelected: () => {},
  setPreInstallDAppSelected: () => {},

  submitHandler: async () => {},
  confirmSubmitHandler: async () => {},

  isMainnet: false,
  withdrawalPeriodSelected: 7,
  preInstallDAppSelected: [],

  chainIdRandom: 0,
  estimateTotalCostData: undefined,
  isAuthenticated: false,
  submiting: false,
  confirmSubmiting: false,
  submitFormParams: undefined,

  showSubmitForm: false,
  setShowSubmitForm: () => {},

  isSubmiting: false,
  setSubmiting: () => {},

  showSubmitFormResult: false,
  setShowSubmitFormResult: () => {},

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

  minGasPriceField: {},
  setMinGasPriceField: () => {},

  blockGasLimitField: {},
  setBlockGasLimitField: () => {},

  // ------------------------------------------------------------

  tickerField: {},
  setTickerField: () => {},

  totalSupplyField: {},
  setTotalSupplyField: () => {},

  receivingAddressField: {},
  setReceivingAddressField: () => {},
};
