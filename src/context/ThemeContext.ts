import { createContext } from 'react';
import { SITE_THEME } from '@/enums/site';

export interface ThemeContextValue {
  theme: Global.Theme;
  toggleTheme: (defaultTheme?: Global.Theme) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: SITE_THEME.DARK,
  toggleTheme: () => {},
});
