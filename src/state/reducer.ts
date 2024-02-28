import application from '@/state/application/reducer';
import userL2Service from '@/state/user/reducer';
import wallets from '@/state/wallets/reducer';
import order from '@/state/order/reducer';

export default {
  application,
  userL2Service, //Use another name causes' it was conficlited with BVM website in Redux Store (using persist storage!)
  wallets,
  order,
};
