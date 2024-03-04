/* eslint-disable no-useless-catch */
import createAxiosInstance from '@/services/http';
import {
  AccountInfo,
  AccountInfoResp,
  HistoryItemResp,
  IGetNonceReq,
  IGetNonceResp,
  IOrderBuyEstimateRespone,
  IOrderBuyReq,
  IQuickStart,
  IVerifyEmail,
  IVerifySignatureReq,
  IVerifySignatureResp,
  IVerifyTokenReq,
  IVerifyTokenResp,
  IWithdrawFundReq,
  OrderItem,
  OrderItemResp,
  OrderStatus,
  QuickStartTypeEnum,
} from '@/interface/services/client';
import configs from '@/configs';
import { builderAccountInfo, builderOrderList } from '@/services/builder/client';
import storageAuthen from '@/storage/storage.authen';
import { COMPUTERS, QUICK_START } from '@/services/builder/constants';
import { IAvailableList } from '@/modules/Buy/Buy.types';
import { IFormValues } from '@/components/ContactModal';
import { getErrorMessage } from '@/utils';
import toast from 'react-hot-toast';

let accessToken = '';

const axios = createAxiosInstance({ baseURL: configs.API_URL + 'api' });

export const axiosSetAccessToken = (token: string) => {
  accessToken = token;
  axios.defaults.headers.Authorization = `${token}`;
};

export const axiosRemoveAccessToken = () => {
  accessToken = '';
  axios.defaults.headers.Authorization = '';
};

const getNonce = async (params: IGetNonceReq): Promise<IGetNonceResp> => {
  const data = (await axios.get(`/auth/nonce?tcAddress=${params.tcAddress}`)) as IGetNonceResp;
  return data;
};

const verifySignature = async (params: IVerifySignatureReq): Promise<IVerifySignatureResp> => {
  const result = (await axios.post(`/auth/verify`, {
    tcAddress: params.tcAddress,
    signature: params.signature,
  })) as IVerifySignatureResp;
  return result;
};

const verifyAccessToken = async (params: IVerifyTokenReq): Promise<IVerifyTokenResp> => {
  const storageToken = storageAuthen.getToken(params.tcAddress);
  const isValid = storageToken?.tcAddress.toLowerCase() === params.tcAddress.toLowerCase();
  if (!isValid || !storageToken?.accessToken) {
    return {
      isValid: false,
    };
  }
  const result = (await axios.post(
    `/auth/verify-access-token`,
    {
      tcAddress: params.tcAddress,
    },
    {
      headers: {
        Authorization: `Bearer ${storageToken.accessToken}`,
      },
    },
  )) as IVerifyTokenResp;
  return result;
};

const accountGetInfo = async (): Promise<AccountInfo> => {
  const account = (await axios.get(`/account/get-info`)) as AccountInfoResp;
  // TODO: remove this
  return builderAccountInfo({
    ...account,
  });
};

const fetchOrderListAPI = async (): Promise<OrderItem[]> => {
  const orders = (await axios.get(`/order/get-list`)) as OrderItemResp[];
  return builderOrderList(
    (orders || []).filter(order => order.status !== OrderStatus.Canceled && order.status !== OrderStatus.Timeout),
    true,
  );
};

const orderBuyAPI = async (params: IOrderBuyReq): Promise<any> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = (await axios.post(`/order/register`, params)) as any;
    // console.log('[orderBuyAPI] data ', data);
    return data;
  } catch (error: any) {
    // console.log('[orderBuyAPI] error  ', error);
    throw error;
  }
};

const fetchHistoryAPI = async (): Promise<any> => {
  try {
    const histories = (await axios.get(`/account/history`)) as HistoryItemResp[];
    return histories?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } catch (error) {
    // console.log('[fetchHistoryAPI] ERROR: ', error);
    return [];
  }
};

const validateChainIdAPI = async (chainId: string): Promise<any> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = (await axios.get(`/validate/chainid?id=${chainId}`)) as any;
    // console.log('[validateChainIdAPI] data ', data);
    return data && data.valid;
  } catch (error: any) {
    // console.log('[validateChainIdAPI] error ', error);
    throw error;
  }
};

const validateSubDomainAPI = async (subdomain: string): Promise<any> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = (await axios.get(`/validate/subdomain?domain=${subdomain + '.l2aas.trustless.computer'}`)) as any;
    // console.log('[validateSubDomainAPI] data ', data);
    return data && data.valid;
  } catch (error: any) {
    // console.log('[validateSubDomainAPI] error ', error);
    throw error;
  }
};

const withdrawFund = async (params: IWithdrawFundReq) => {
  await axios.post(`/account/withdraw-balance`, params);
};

const withdrawRewards = async (orders: OrderItem[]): Promise<any> => {
  for (const order of orders) {
    try {
      if (order.isWithdrawableReward) {
        await axios.post(`/account/withdraw-reward`, {
          orderID: order.orderId,
        });
      }
    } catch (error) {
      // console.log('[withdrawRewards] error ', error);
    }
  }
};

const cancelOrder = async (orderID: string) => {
  await axios.post(`/order/cancel`, {
    orderId: orderID,
  });
};

const getAllOrders = async (): Promise<OrderItem[]> => {
  const orders = (await axios.get(`/order/list`)) as OrderItemResp[];
  return builderOrderList(
    COMPUTERS.concat(orders || []).filter(order => order.status === OrderStatus.Started),
    false,
  );
};

const fetchAvailableList = async (): Promise<IAvailableList> => {
  try {
    let data = (await axios.get(`/order/available-list`)) as IAvailableList;
    return data;
  } catch (error) {
    // console.log('[fetchAvailableList] ERROR: ', error);
    throw error;
  }
};

const estimateTotalCostAPI = async (params: IOrderBuyReq): Promise<IOrderBuyEstimateRespone> => {
  try {
    const data = (await axios.post(`/order/estimate-total-cost`, params)) as IOrderBuyEstimateRespone;
    // console.log('[estimateTotalCostAPI] data ', data);
    return data;
  } catch (error: any) {
    // console.log('[estimateTotalCostAPI] error ', error);
    throw error;
  }
};

const submitContact = async (params: IFormValues) => {
  await axios.post(`/service/contact`, params);
};

export type SubmitFormParams = {
  bitcoinL2Name: string;
  bitcoinL2Description: string;
  network: string;
  dataAvailability: string;
  blockTime: string;
  rollupProtocol: string;
  withdrawPeriod: string;
  twName: string;
  telegram: string;
};

const submitContactVS2 = async (params: SubmitFormParams) => {
  await axios.post(`/service/contact`, params);
};

const getQuickStart = async (): Promise<Array<IQuickStart> | undefined> => {
  const data = (await axios.get(`/service/quick-start`)) as Array<IQuickStart> | undefined;
  return data;
};

const updateQuickStart = async (type: QuickStartTypeEnum, data?: any): Promise<boolean> => {
  let isSuccess = false;
  try {
    await axios.put(`/service/quick-start`, {
      type,
      data,
    });
    isSuccess = true;
  } catch (error) {
    const { message } = getErrorMessage(error);
    toast.error(message);
  }
  return isSuccess;
};

const submitEmail = async (email: string) => {
  await axios.post(`/account/submit-email`, {
    email,
  });
};

const verifyEmail = async (payload: IVerifyEmail) => {
  await axios.post(`/account/verify-email`, {
    token: payload.token + '',
    email: payload.email,
  });
};

const client = {
  getNonce,
  verifySignature,
  verifyAccessToken,
  fetchOrderListAPI,
  accountGetInfo,
  fetchHistoryAPI,
  orderBuyAPI,
  withdrawFund,
  validateChainIdAPI,
  validateSubDomainAPI,
  withdrawRewards,
  cancelOrder,
  getAllOrders,
  fetchAvailableList,
  estimateTotalCostAPI,
  submitContact,
  submitContactVS2,
  getQuickStart,
  updateQuickStart,
  submitEmail,
  verifyEmail,
};

export default client;
