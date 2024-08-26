import type { GetListType } from '@/types/type';

export const I18N_STORE_KEY = 'NEXT_LOCALE';

export const PLATFORM_UI_I18N_STORE_KEY = 'locale';

export const languageList = ['en', 'zh-CN', 'zh-HK', 'dev-lang'] as const;
export const I18N_LOCALES = languageList;
export const localeCookie = ['en_US', 'zh_HK', 'zh_CN'] as const;

export type LocaleTypeUnio = GetListType<typeof languageList>;
export type LocaleCookieTypeUnio = GetListType<typeof localeCookie>;
export const DEFAULT_LOCALE: LocaleTypeUnio = languageList[0];
