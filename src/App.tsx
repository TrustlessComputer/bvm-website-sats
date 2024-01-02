import React from 'react';
import routes from '@/routes/index';
import { useLocation, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/state';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeProvider, { ThemedGlobalStyle } from '@/theme/theme';
import { Toaster } from 'react-hot-toast';
import './reset.scss';
import '@/styles/index.scss';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Web3Provider from '@/components/Web3Provider';
import { WalletProvider } from '@/contexts/wallet.context';
import { LoadingProvider } from '@/contexts/loading';
import { AssetsProvider } from '@/contexts/assets.context';
import Hydrated from '@/components/Hydrated';
import { ModalsProvider } from '@/contexts/modals.context';
import useShowHeader from '@/hooks/useShowHeader';
import { PREFIX } from '@/constants/route-path';

let persistor = persistStore(store);

const Redirect = () => {
  const isLocal = window.location.hostname === 'localhost';
  const location = useLocation();
  const showHeader = useShowHeader();

  React.useEffect(() => {
    if (showHeader && !isLocal) {
      window.location.href = location.pathname.replace(PREFIX, '/blockchains');
    }
  }, [isLocal, location.pathname, showHeader]);
  return <></>;
};

const App: React.FC = (): React.ReactElement => {
  const element = useRoutes(routes);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Redirect />
        <ThemeProvider>
          <ThemedGlobalStyle />
          <Web3Provider>
            <WalletProvider>
              <AssetsProvider>
                <LoadingProvider>
                  <ModalsProvider>
                    <Hydrated>{element}</Hydrated>
                  </ModalsProvider>
                </LoadingProvider>
              </AssetsProvider>
            </WalletProvider>
          </Web3Provider>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                lineBreak: 'auto',
                maxWidth: 400,
                wordBreak: 'break-word',
              },
            }}
          />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
