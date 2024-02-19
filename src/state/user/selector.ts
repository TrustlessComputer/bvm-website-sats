import { RootState } from '@/state';
import { createSelector } from '@reduxjs/toolkit';
import { UserState } from '@/state/user/reducer';
import { AccountInfo } from '@/interface/services/client';

export const userSelector = (state: RootState): UserState => state.userL2Service;

const isAuthenticatedSelector = createSelector(userSelector, user => (tcAddress?: string) => {
  return tcAddress && (user.authen || {})[tcAddress.toLowerCase()];
});

const authenTokensSelector = createSelector(userSelector, user => {
  return user.authen || {};
});

const historyInfoSelector = createSelector(userSelector, reducer => {
  return {
    isHistoryFetching: reducer.isHistoryFetching,
    historyList: reducer.historyList,
  };
});

const accountInfoSelector = createSelector(userSelector, user => user.accountInfo as AccountInfo | undefined);

const userGamefiByAddressSelector = createSelector(userSelector, user => (tcAddress?: string) => {
  return tcAddress && (user.userGamefi || {})[tcAddress.toLowerCase()];
});

const isFetchingUserGamefi = createSelector(userSelector, user => {
  return user.fetchingUserGamefi;
});

const quickStartSelector = createSelector(userSelector, user => {
  return user.quickStart;
});

export {
  isAuthenticatedSelector,
  historyInfoSelector,
  accountInfoSelector,
  userGamefiByAddressSelector,
  isFetchingUserGamefi,
  authenTokensSelector,
  quickStartSelector,
};
