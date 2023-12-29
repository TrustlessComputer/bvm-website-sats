import { ROUTE_PATH } from '@/constants/route-path';
import { SiderItemType } from './types';
import configs from '@/configs';

const ICON_URL = configs.CDN_APP_ICON_URL;

export const HomeItem: SiderItemType = {
  key: 'Home',
  label: 'Home',
  iconURL: `${ICON_URL}/home.svg`,
  visible: true,
  path: ROUTE_PATH.HOME,
  needAuth: false,
};

const HistoryItem: SiderItemType = {
  key: 'History',
  label: 'History',
  iconURL: `${ICON_URL}/calendar.svg`,
  visible: true,
  path: ROUTE_PATH.ACCOUNT,
  needAuth: true,
};

const SiderItemsList: SiderItemType[] = [HomeItem, HistoryItem];

export default SiderItemsList;
