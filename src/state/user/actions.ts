import { createAsyncThunk } from '@reduxjs/toolkit';
import { PREFIX } from './constants';
import client from '@/services/client';
import gamefiService from '@/services/gamefi';

const fetchAccountInfo = createAsyncThunk(`${PREFIX}/fetchAccountInfo`, async () => {
  try {
    const data = await client.accountGetInfo();
    // console.log('1 data ', data);
    return data;
  } catch (error) {
    // console.log('2 error ', error);
    return undefined;
  }
});

const fetchHistory = createAsyncThunk(`${PREFIX}/fetchHistory`, async () => {
  try {
    const data = await client.fetchHistoryAPI();
    return data;
  } catch (error) {
    // console.log('[fetchHistory] ERROR ', error);
    return [];
  }
});

const fetchUserGamefi = createAsyncThunk(`${PREFIX}/fetchUserGamefi`, async (tcAddress?: string) => {
  if (!tcAddress) return undefined;
  try {
    const user = await gamefiService.getUserGameInfo(tcAddress);
    return {
      tcAddress,
      user,
    };
  } catch (error) {
    // console.log('[fetchUserGamefi] ERROR ', error);
    return undefined;
  }
});

const getQuickStart = createAsyncThunk(`${PREFIX}/getQuickStart`, async () => {
  try {
    const data = await client.getQuickStart();
    return data;
  } catch (error) {
    return undefined;
  }
});

// const actionCreators = {
//   setOrderSelected,
// };

// Export Pure Actions
// export { actionCreators };

// Export Async Actions
export { fetchAccountInfo, fetchHistory, fetchUserGamefi, getQuickStart };
