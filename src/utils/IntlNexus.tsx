'use client';

import { useLocale } from 'next-intl';
import useTranslations from '@/hooks/useTranslations';

type LocalI18NReturnValue = ReturnType<typeof useTranslations>;

type Nexus = {
  getLocale(): string | undefined;
  local: LocalI18NReturnValue;
};

const nexus: Nexus = {
  local: {},
  getLocale() {
    return undefined;
  },
} as Nexus;

export default function IntlNexus() {
  const { t, raw, rich, markup } = useTranslations();

  const locale = useLocale() as I18N.LocaleType;

  nexus.local.t = t;
  nexus.local.raw = raw;
  nexus.local.rich = rich;
  nexus.local.markup = markup;

  nexus.getLocale = () => locale;

  return null;
}

export const t: LocalI18NReturnValue['t'] = (...args) => {
  return nexus.local?.t(...args);
};

export const raw: LocalI18NReturnValue['raw'] = (...args) => {
  return nexus.local?.raw(...args);
};

export const rich: LocalI18NReturnValue['rich'] = (...args) => {
  return nexus.local?.rich(...args);
};

export const markup: LocalI18NReturnValue['markup'] = (...args) => {
  return nexus.local?.markup(...args);
};
