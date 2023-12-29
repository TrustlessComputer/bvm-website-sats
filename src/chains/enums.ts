import configs from '@/configs';

enum SupportedChainId {
  UNKNOW = -1,
  NOS = configs.isProd ? 42213 : 42070,
}

export { SupportedChainId };
