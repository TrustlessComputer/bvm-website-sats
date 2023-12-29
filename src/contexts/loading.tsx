import { Modal } from 'antd';
import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Spinner } from '@/components/Spinner';
import px2rem from '@/utils/px2rem';
import Text from '@/components/Text';
import CardBg from '@/assets/images/card.png';

const ModalWrapper = styled(Modal)`
  &.ant-modal {
    max-width: ${px2rem(250)};
  }
  .ant-modal-content {
    padding: ${px2rem(32)};
    gap: ${px2rem(52)};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.background_secondary};
    background-image: url(${CardBg});
    background-size: cover;
    background-position: center center;
  }

  .spinner {
    margin-left: ${px2rem(16)};
    margin-bottom: ${px2rem(24)};
  }

  .label {
    animation: extend 2s infinite ease-in-out;
  }
  .label:after {
    content: ' ...';
  }
  @keyframes extend {
    0% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }
`;

interface ShowLoadingProps {
  value: boolean;
  message?: string;
}
interface LoadingContextType {
  showLoading: (_: ShowLoadingProps) => void;
}
const LoadingContextInit = {
  showLoading: () => {},
};

const LoadingContext = React.createContext<LoadingContextType>(LoadingContextInit);

export function LoadingProvider(props: React.PropsWithChildren<{}>) {
  const [loadingProps, setLoading] = useState<ShowLoadingProps>({
    value: false,
    message: 'Loading',
  });

  const children = useMemo(() => props.children, [props]);
  const renderModalLoading = (message?: string) => {
    return (
      <ModalWrapper title={null} centered open={true} footer={null} closeIcon={null}>
        <Spinner color="button_primary" className="spinner" size={24} />
        <Text fontWeight="medium" size="18" align="center" className="label">
          {message}
        </Text>
      </ModalWrapper>
    );
  };
  return (
    <LoadingContext.Provider
      value={{
        showLoading: setLoading,
      }}
    >
      <React.Fragment>
        {children}
        {loadingProps.value && renderModalLoading(loadingProps.message || 'Loading...')}
      </React.Fragment>
    </LoadingContext.Provider>
  );
}

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('Loading not found, useLoading must be used within the <LoadingProvider>..</LoadingProvider>');
  }
  return context;
};
