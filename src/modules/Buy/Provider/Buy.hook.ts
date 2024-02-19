'use client';

import { useContext } from 'react';
import { IBuyContext } from '../Buy.types';
import { BuyContext } from './Buy.context';

export const useBuyProvider = (): IBuyContext => {
  const values = useContext(BuyContext);
  return values;
};
