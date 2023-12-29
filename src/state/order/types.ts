import { OrderItem } from '@/interface/services/client';

interface OrderState {
  isFetching: boolean;
  isFetched: boolean;
  orderList: OrderItem[];
  isFetchingAllOrders: boolean;
  isFetchedAllOrders: boolean;
  allOrders: OrderItem[];
  orderSelected: OrderItem | undefined;
}
export type { OrderState };
