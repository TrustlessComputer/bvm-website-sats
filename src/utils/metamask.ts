const openMetamaskDeeplink = (url?: string): void => {
  const appURL = url || window.location.href;
  const deeplink = `https://metamask.app.link/dapp/${appURL}`;
  window.location.href = deeplink;
};

const sendMetamaskDeeplink = (address: string, amount: string, chainId: number): void => {
  const deeplink = `https://metamask.app.link/send/${address}@${chainId}?value=${amount}`;
  window.location.href = deeplink;
};

export { openMetamaskDeeplink, sendMetamaskDeeplink };
