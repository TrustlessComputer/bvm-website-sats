import React from 'react';
import { BuyPage } from '@/modules/Buy';
import { BuyProvider } from '@/modules/Buy/providers/Buy.context';

const BuyContainer = React.memo(() => {
  return (
    <BuyProvider>
      <BuyPage />
    </BuyProvider>
  );
});

export default BuyContainer;
