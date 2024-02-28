'use client';

import { useContext } from 'react';
import { BuyContext, IBuyContext } from './Buy.context';

export const useBuyProvider = (): IBuyContext => {
  const values = useContext(BuyContext);
  return values;
};
