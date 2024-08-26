import { toNestedObject } from '@/utils/toNestedObject';
import { LOCAL_I18N_NS } from '@/enums/site';

type AbstractIntlMessages = {
  [id: string]: AbstractIntlMessages | string;
};

const localEn = import('../locales/en.json');
const localZhHant = import('../locales/zh-HK.json');
const localZhHans = import('../locales/zh-CN.json');
const localJSONMap = {
  en: localEn,
  'dev-lang': Promise.resolve({ default: {} }),
  'zh-CN': localZhHans,
  'zh-HK': localZhHant,
};

export async function getMessages(locale: I18N.LocaleType) {
  return {
    _server_loaded: 'true',
    [LOCAL_I18N_NS]: toNestedObject(
      (await localJSONMap[locale as I18N.LocaleType]).default,
    ),
  } as AbstractIntlMessages;
}
