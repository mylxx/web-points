import { useCallback } from 'react';
import { useTranslations as useOriginTranslations } from 'next-intl';
import { i18nKeyRewrite } from '@/utils/toNestedObject';
import { LOCAL_I18N_NS, REMOTE_I18N_NS } from '@/enums/site';
import enLocale from '@/locales/en.json';
import type { ObjectNormalizePaths } from '@/types/type';

export type TranslationKey = ObjectNormalizePaths<typeof enLocale>;
export default function useTranslations() {
  const translateMethod = useOriginTranslations(LOCAL_I18N_NS);

  const t = useCallback(
    (
      key: TranslationKey,
      values?: Parameters<typeof translateMethod>[1],
      formats?: Parameters<typeof translateMethod>[2],
    ) => {
      return translateMethod(key, values, formats);
    },
    [translateMethod],
  );
  const rich = useCallback(
    (
      key: TranslationKey,
      values?: Parameters<typeof translateMethod.rich>[1],
      formats?: Parameters<typeof translateMethod.rich>[2],
    ) => {
      return translateMethod.rich(key, values, formats);
    },
    [translateMethod],
  );
  const markup = useCallback(
    (
      key: TranslationKey,
      values?: Parameters<typeof translateMethod.markup>[1],
      formats?: Parameters<typeof translateMethod.markup>[2],
    ) => {
      return translateMethod.markup(key, values, formats);
    },
    [translateMethod],
  );
  const raw = useCallback(
    (key: TranslationKey) => {
      return translateMethod.raw(key);
    },
    [translateMethod],
  );

  return {
    t,
    raw,
    rich,
    markup,
  };
}

export function useRemoteTranslations() {
  const translateMethod = useOriginTranslations(REMOTE_I18N_NS);
  const t = useCallback(
    (
      key: string,
      values?: Parameters<typeof translateMethod>[1],
      formats?: Parameters<typeof translateMethod>[2],
    ) => {
      return translateMethod(i18nKeyRewrite(key), values, formats);
    },
    [translateMethod],
  );
  const rich: typeof translateMethod.rich = useCallback(
    (key, values, formats) => {
      return translateMethod.rich(i18nKeyRewrite(key), values, formats);
    },
    [translateMethod],
  );
  const markup: typeof translateMethod.markup = useCallback(
    (key, values, formats) => {
      return translateMethod.markup(i18nKeyRewrite(key), values, formats);
    },
    [translateMethod],
  );
  const raw: typeof translateMethod.raw = useCallback(
    (key) => {
      return translateMethod.raw(i18nKeyRewrite(key));
    },
    [translateMethod],
  );
  return {
    t,
    raw,
    rich,
    markup,
  };
}
