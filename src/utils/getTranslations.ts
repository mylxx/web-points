import {
  getTranslations as originGetTranslations,
  getLocale,
} from 'next-intl/server';
import { LOCAL_I18N_NS, REMOTE_I18N_NS } from '@/enums/site';
import enLocale from '@/locales/en.json';
import type { ObjectNormalizePaths } from '@/types/type';

export const getTranslations = async () => {
  const locale = await getLocale();
  const t = await originGetTranslations({ locale, namespace: LOCAL_I18N_NS });
  return (key: ObjectNormalizePaths<typeof enLocale>) => t(key);
};

export const getRemoteTranslations = async () => {
  const locale = await getLocale();
  const t = await originGetTranslations({ locale, namespace: REMOTE_I18N_NS });
  return (key: string) => t(key);
};
