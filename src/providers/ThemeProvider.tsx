'use client';

import { FC, useState, ReactNode, useEffect, useRef } from 'react';
import { usePathname } from '@/utils/navigation';
import { getLocalTheme, setLocalTheme } from '@/utils/themeUtils';
import { ThemeContext, ThemeContextValue } from '@/context/ThemeContext';
import { SITE_THEME } from '@/enums/site';

const { Provider } = ThemeContext;

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Global.Theme>(SITE_THEME.DARK);
  const preTheme = useRef<Global.Theme>();
  const pathname = usePathname();

  const toggleTheme: ThemeContextValue['toggleTheme'] = (defaultTheme) => {
    const newTheme =
      defaultTheme ||
      (theme === SITE_THEME.LIGHT ? SITE_THEME.DARK : SITE_THEME.LIGHT);
    setLocalTheme(newTheme);
    toggleMeta(newTheme);
    setTheme(newTheme);
  };

  const toggleMeta = (theme: Global.Theme) => {
    let meta = document.querySelector('#colorSchemeMeta') as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.id = 'colorSchemeMeta';
      meta.name = 'color-scheme';
      document.head.append(meta);
    }
    meta.content = theme;
  };

  useEffect(() => {
    const theme = getLocalTheme() || SITE_THEME.DARK;
    const htmlDom = document.body;
    const beforeTheme =
      theme === SITE_THEME.LIGHT ? SITE_THEME.DARK : SITE_THEME.LIGHT;
    htmlDom.classList.remove(beforeTheme);
    htmlDom.classList.add(theme);
    toggleTheme(theme);
  }, [theme]);

  return <Provider value={{ theme, toggleTheme }}>{children}</Provider>;
};
