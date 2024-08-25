import { toNestedObject } from '@/utils/toNestedObject';
import { LOCAL_I18N_NS } from '@/enums/site';

type AbstractIntlMessages = {
  [id: string]: AbstractIntlMessages | string;
};

const localEn = import('../locales/en.json');
const localZhHant = import('../locales/zh-Hant.json');
const localZhHans = import('../locales/zh-Hans.json');
const localJSONMap = {
  en: localEn,
  'dev-lang': Promise.resolve({ default: {} }),
  'zh-Hans': localZhHans,
  'zh-Hant': localZhHant,
};

export async function getMessages(locale: I18N.LocaleType) {
  return {
    _server_loaded: 'true',
    [LOCAL_I18N_NS]: toNestedObject(
      (await localJSONMap[locale as I18N.LocaleType]).default,
    ),
  } as AbstractIntlMessages;
}
