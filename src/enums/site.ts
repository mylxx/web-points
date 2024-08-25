export const AUTH_TOKEN_STORE_KEY = 'authToken';

export const HEADER_AUTH_TOKEN_KEY = 'Authorization';

export const THEME_STORE_KEY = 'darcy_theme';

export const CHANNEL_CODE_KEY = 'channel';

export const LOCAL_I18N_NS = 'i18n_local';

export const REMOTE_I18N_NS = 'i18n_remote';

export enum SITE_THEME {
  LIGHT = 'light',
  DARK = 'dark',
}

export const HEADER_HIDDEN_PATH: string[] = [];

// 需要登陆才能访问的 内部路由，没有登陆跳 内部 /
export const INSIDE_LOGIN_VISIT_PATH: string[] = [];
