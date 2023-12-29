import React from 'react';
import { RouteObject } from 'react-router-dom';
import { LayoutContent, LayoutNoPadding } from '@/pages/layout';
import HomePage from '@/pages/DashBoard';
import NotFound from '@/pages/404';
import History from '@/pages/history';
import WellcomePage from '@/pages/wellcome';
import BuyPage from '@/pages/Buy';

import { ROUTE_PATH } from '@/constants/route-path';
import Tokenomics from '@/pages/tokenomics';
import Price from '@/pages/price';

export default [
  {
    path: ROUTE_PATH.NOT_FOUND,
    element: <NotFound />,
  },
  {
    path: ROUTE_PATH.HOME,
    element: <LayoutNoPadding parentDark={false} />,
    children: [{ index: true, element: <WellcomePage /> }],
  },
  {
    path: ROUTE_PATH.DASHBOARD,
    element: <LayoutContent />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: ROUTE_PATH.ACCOUNT,
    element: <LayoutContent />,
    children: [{ index: true, element: <History /> }],
  },
  {
    path: ROUTE_PATH.TOKENOMICS,
    element: <LayoutContent />,
    children: [{ index: true, element: <Tokenomics /> }],
  },
  {
    path: ROUTE_PATH.BUY,
    element: <LayoutContent />,
    children: [{ index: true, element: <BuyPage /> }],
  },
  {
    path: ROUTE_PATH.PRICE,
    element: <LayoutContent />,
    children: [{ index: true, element: <Price /> }],
  },
] as RouteObject[];
