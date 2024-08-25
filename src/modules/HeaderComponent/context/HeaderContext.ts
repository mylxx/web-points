import { createContext } from 'react';
import { HeaderProps } from '@/modules/HeaderComponent/types/header.type';

export const HeaderContext = createContext<HeaderProps>({
  userInfo: undefined,
});
