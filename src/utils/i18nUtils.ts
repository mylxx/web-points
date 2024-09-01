import Cookies from 'js-cookie';
import {
  I18N_STORE_KEY,
  languageList,
  LocaleCookieTypeUnio,
  PLATFORM_UI_I18N_STORE_KEY,
} from '@/enums/i18n';

export const getCookieLocale = () => {
  return (Cookies.get(I18N_STORE_KEY) || 'en') as I18N.LocaleType;
};

// 服务端locale与客户端不同，这里做映射
export const getServerLocale = (locale: I18N.LocaleType = 'en') => {
  const localeMap: Record<I18N.LocaleType, 'en' | 'zh_cn' | 'zh_tw'> = {
    en: 'en',
    'zh-CN': 'zh_cn',
    'zh-HK': 'zh_tw',
    'dev-lang': 'en',
  };
  return localeMap[locale];
};

// 获取plateform-ui
export const getPlateFormUILocale = (locale: LocaleCookieTypeUnio) => {
  const localeMap: Record<LocaleCookieTypeUnio, string> = {
    en_US: 'en',
    zh_CN: 'zh-CN',
    zh_HK: 'zh-HK',
  };
  return localeMap[locale || 'en_US'];
};

export const getHTTPHeaderLocale = () => {
  const cookieLocale = getCookieLocale();
  return getServerLocale(cookieLocale);
};

// 匹配多语言路径
export const extractLanguagePaths = (url: string) => {
  const languageSet = languageList
    .map((lang) => lang.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
    .join('|');
  const regex = new RegExp(`\\/(${languageSet})(?=\\/|$)`);
  const match = url.match(regex);
  return match ? match[1] : null;
};

// 给本地cookie设置多语言
export const setLocaleCookie = (
  locale: I18N.LocaleType,
  key: string = PLATFORM_UI_I18N_STORE_KEY,
) => {
  Cookies.set(key, getServerLocale(locale || 'en'));
};
