// ------------------------------------------------------------------------------------
export enum NetworkEnum {
  Network_Testnet = 1,
  Network_Mainnet = 2,
}

export const NetworkEnumMap = {
  [NetworkEnum.Network_Testnet]: 'Testnet',
  [NetworkEnum.Network_Mainnet]: 'Mainnet',
};

// ------------------------------------------------------------------------------------

export enum DALayerEnum {
  DALayer_PLG = 10,
  DALayer_BTC = 11,
  DALayer_Goerli = 12,
  DALayer_Celestia = 13,
}

export const DALayerEnumMap = {
  [DALayerEnum.DALayer_PLG]: 'Bitcoin + Polygon',
  [DALayerEnum.DALayer_BTC]: 'Bitcoin Only',
  [DALayerEnum.DALayer_Goerli]: 'Bitcoin + Ethereum (Goerli)',
  [DALayerEnum.DALayer_Celestia]: 'Bitcoin + Celestia',
};

// ------------------------------------------------------------------------------------

export enum RollupEnum {
  Rollup_OpStack = 20,
  Rollup_ZK = 21,
}

export const RollupEnumMap = {
  [RollupEnum.Rollup_OpStack]: 'OP Stack',
  [RollupEnum.Rollup_ZK]: 'ZK Rollups',
};

// ------------------------------------------------------------------------------------

export enum IntervalChargeTimeEnum {
  IntervalChargeTime_Monthly = 1000,
  IntervalChargeTime_Daily = 1001,
}

export const IntervalChargeTimeEnumMap = {
  [IntervalChargeTimeEnum.IntervalChargeTime_Monthly]: 'BVM per month',
  [IntervalChargeTimeEnum.IntervalChargeTime_Daily]: 'BVM per day',
};

// ------------------------------------------------------------------------------------

export enum PluginEnum {
  Plugin_Bridge = 30,
  Plugin_Dex = 31,
  Plugin_NFTMarketplace = 32,
  Plugin_DAO = 33,
}

export const PluginEnumMap = {
  [PluginEnum.Plugin_Bridge]: 'Bridge',
  [PluginEnum.Plugin_Dex]: 'Exchange',
  [PluginEnum.Plugin_NFTMarketplace]: 'NFT Marketplace',
  [PluginEnum.Plugin_DAO]: 'DAO',
};

// ------------------------------------------------------------------------------------
export enum PluginTypeEnum {
  PluginType_Bridge = 40,
  PluginType_Exchange = 41,
  PluginType_Marketplace = 42,
  PluginType_DAO = 43,
}

export const PluginTypeEnumMap = {
  [PluginTypeEnum.PluginType_Bridge]: 'Bridge',
  [PluginTypeEnum.PluginType_Exchange]: 'Exchange',
  [PluginTypeEnum.PluginType_Marketplace]: 'NFT Marketplace',
  [PluginTypeEnum.PluginType_DAO]: 'DAO',
};

// TO DO
export enum Layer1Enum {
  Bitcoin = 2000,
  Ethereum = 2001,
}

// TO DO
export const Layer1EnumMap = {
  [Layer1Enum.Bitcoin]: 'Bitcoin',
  [Layer1Enum.Ethereum]: 'Ethereum',
};
