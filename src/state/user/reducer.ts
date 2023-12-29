import { createSlice } from '@reduxjs/toolkit';
import { ConnectionType } from '@/connection/types';
import { updateVersion } from '@/state/global/actions';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PREFIX } from './constants';
import { fetchAccountInfo, fetchHistory, fetchUserGamefi, getQuickStart } from './actions';
import { AccountInfo, IQuickStart } from '@/interface/services/client';
import { IUserGameInfo } from '@/interface/services/gamefi';

export interface UserState {
  selectedWallet?: ConnectionType;
  authen: {
    [key: string]: boolean;
  };

  isFetching: boolean;

  accountInfo?: AccountInfo;

  isHistoryFetching: boolean;
  historyList: any[];
  fetchingUserGamefi: boolean;
  userGamefi?: {
    [key: string]: IUserGameInfo;
  };
  quickStart: Array<IQuickStart> | undefined;
}

export const initialState: UserState = {
  selectedWallet: undefined,
  authen: {},
  isFetching: false,
  accountInfo: undefined,

  isHistoryFetching: false,
  historyList: [],
  fetchingUserGamefi: false,
  userGamefi: undefined,
  quickStart: undefined,
};

const userSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    updateSelectedWallet(state, { payload: { wallet } }) {
      state.selectedWallet = wallet;
    },
    setAuthen(state, { payload: { tcAddress, isAuthen } }) {
      state.authen[tcAddress.toLowerCase()] = isAuthen;
    },
    removeAuthen(state, { payload: { tcAddress } }) {
      if (!!tcAddress && !!state.authen[tcAddress.toLowerCase()]) {
        delete state.authen[tcAddress.toLowerCase()];
      }
    },
    resetAccount(state) {
      state.accountInfo = undefined;
      state.quickStart = undefined;
    },
  },
  extraReducers: builder => {
    // After adding a new property to the state, its value will be `undefined` (instead of the default)
    // for all existing users with a previous version of the state in their localStorage.
    // In order to avoid this, we need to set a default value for each new property manually during hydration.
    builder
      .addCase(updateVersion, state => {
        // If `selectedWallet` is a WalletConnect v1 wallet, reset to default.
        if (state.selectedWallet) {
          const selectedWallet = state.selectedWallet as string;
          if (
            selectedWallet === 'UNIWALLET' ||
            selectedWallet === 'UNISWAP_WALLET' ||
            selectedWallet === 'WALLET_CONNECT'
          ) {
            delete state.selectedWallet;
          }
        }
      })
      .addCase(fetchAccountInfo.pending, state => {
        state.isFetching = true;
      })
      .addCase(fetchAccountInfo.fulfilled, (state, action) => {
        state.isFetching = false;
        state.accountInfo = action.payload;
      })
      .addCase(fetchAccountInfo.rejected, state => {
        state.isFetching = true;
        state.accountInfo = undefined;
      })

      .addCase(fetchHistory.pending, state => {
        state.isHistoryFetching = true;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.isHistoryFetching = false;
        state.historyList = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, _) => {
        state.isHistoryFetching = true;
        state.historyList = [];
      })
      .addCase(fetchUserGamefi.pending, state => {
        state.fetchingUserGamefi = true;
      })
      .addCase(fetchUserGamefi.fulfilled, (state, action) => {
        state.fetchingUserGamefi = false;
        const { tcAddress, user } = (action.payload || {}) as any;
        if (tcAddress) {
          state.userGamefi = {
            ...state.userGamefi,
            [tcAddress.toLowerCase()]: user,
          };
        } else {
          state.userGamefi = undefined;
        }
      })
      .addCase(fetchUserGamefi.rejected, state => {
        state.fetchingUserGamefi = false;
      })
      .addCase(getQuickStart.fulfilled, (state, action) => {
        state.quickStart = action.payload;
      })
      .addCase(getQuickStart.rejected, state => {
        state.quickStart = undefined;
      });
  },
});

export const { updateSelectedWallet, setAuthen, removeAuthen, resetAccount } = userSlice.actions;

const persistConfig = {
  key: 'user',
  storage: storage,
  whitelist: ['selectedWallet'],
};

export default persistReducer(persistConfig, userSlice.reducer);
