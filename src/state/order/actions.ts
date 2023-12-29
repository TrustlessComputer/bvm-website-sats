import { createAsyncThunk } from '@reduxjs/toolkit';
import { PREFIX } from './constants';
import client from '@/services/client';
import { IOrderBuyReq, OrderItem } from '@/interface/services/client';

const fetchOrderList = createAsyncThunk(`${PREFIX}/fetchOrderList`, async (): Promise<OrderItem[]> => {
  try {
    const orders = await client.fetchOrderListAPI();
    return orders;
  } catch (error) {
    return [];
  }
});

const fetchAllOrders = createAsyncThunk(`${PREFIX}/fetchAllOrders`, async (): Promise<OrderItem[]> => {
  try {
    const orders = await client.getAllOrders();
    return orders;
  } catch (error) {
    return [];
  }
});

const orderBuy = createAsyncThunk(`${PREFIX}/orderBuy`, async (params: IOrderBuyReq): Promise<any> => {
  try {
    const result = await client.orderBuyAPI(params);
    return result;
  } catch (error) {
    return [];
  }
});

// const actionCreators = {
//   setOrderSelected,
// };

// Export Pure Actions
// export { actionCreators };

// Export Async Actions
export { fetchOrderList, orderBuy, fetchAllOrders };
