import React, { PropsWithChildren, useMemo } from 'react';
import useToggle from '@/hooks/useToggle';
import ContactModal from '@/components/ContactModal';

export interface IModalsContext {
  showContact: boolean;
  toggleContact: () => void;
}

const initialValue: IModalsContext = {
  showContact: false,
  toggleContact: () => {},
};

export const ModalsContext = React.createContext<IModalsContext>(initialValue);

export const ModalsProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren): React.ReactElement => {
  const [showContact, toggleContact] = useToggle(false);

  const contextValues = useMemo((): IModalsContext => {
    return {
      showContact,
      toggleContact,
    };
  }, [showContact, toggleContact]);

  return (
    <ModalsContext.Provider value={contextValues}>
      {children}
      {showContact && <ContactModal show={showContact} handleClose={toggleContact} />}
    </ModalsContext.Provider>
  );
};
