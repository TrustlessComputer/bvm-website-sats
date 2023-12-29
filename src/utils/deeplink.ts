import { injectedConnection } from '@/connection/connection';

const isDeepLinkRequired = (): boolean => {
  return !injectedConnection.shouldDisplay();
};

export { isDeepLinkRequired };
