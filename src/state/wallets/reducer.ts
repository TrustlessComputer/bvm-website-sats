import { createSlice } from '@reduxjs/toolkit';
import { shallowEqual } from 'react-redux';

import { Wallet } from './types';

interface WalletState {
  // Used to track wallets that have been connected by the user in current session, and remove them when deliberately disconnected.
  // Used to compute is_reconnect event property for analytics
  connectedWallets: Wallet[];
  switchingChain: number | false;
}

const initialState: WalletState = {
  connectedWallets: [],
  switchingChain: false,
};

const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    addConnectedWallet(state, { payload }) {
      try {
        if (
          state.connectedWallets &&
          state.connectedWallets.length > 0 &&
          state.connectedWallets.some(wallet => wallet !== undefined && shallowEqual(payload, wallet))
        )
          return;
        state.connectedWallets = [...state.connectedWallets, payload];
      } catch (error) {}
    },
    startSwitchingChain(state, { payload }) {
      state.switchingChain = payload;
    },
    endSwitchingChain(state) {
      state.switchingChain = false;
    },
  },
});

export const { addConnectedWallet, startSwitchingChain, endSwitchingChain } = walletsSlice.actions;
export default walletsSlice.reducer;
