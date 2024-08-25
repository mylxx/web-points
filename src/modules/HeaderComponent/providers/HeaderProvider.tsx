'use client';

import React, { PropsWithChildren } from 'react';
import { HeaderContext } from '../context/HeaderContext';
const { Provider } = HeaderContext;
import { HeaderProps } from '../types/header.type';
import { navigatorDefault } from '@/modules/HeaderComponent/utils/MenuTool';
interface HeaderProviderProps extends PropsWithChildren, HeaderProps {}

export const HeaderProvider = (props: HeaderProviderProps) => {
  const { children, ...providerValue } = props;

  return (
    <Provider
      value={{
        ...providerValue,
        clickMenuCallBack: providerValue.clickMenuCallBack ?? navigatorDefault,
      }}
    >
      {children}
    </Provider>
  );
};
