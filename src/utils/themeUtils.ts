import { SITE_THEME, THEME_STORE_KEY } from '@/enums/site';

export const setLocalTheme = (theme: Global.Theme) => {
  localStorage.setItem(THEME_STORE_KEY, theme);
};

export const getLocalTheme = (): SITE_THEME => {
  return localStorage.getItem(THEME_STORE_KEY) as SITE_THEME;
};
