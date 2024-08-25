'use client';

import { useLocale } from 'next-intl';
import useTranslations, {
  useRemoteTranslations,
} from '@/hooks/useTranslations';

type LocalI18NReturnValue = ReturnType<typeof useTranslations>;
type RemoteI18NReturnValue = ReturnType<typeof useRemoteTranslations>;

type Nexus = {
  getLocale(): string | undefined;
  local: LocalI18NReturnValue;
  remote: RemoteI18NReturnValue;
};

const nexus: Nexus = {
  local: {},
  remote: {},
  getLocale() {
    return undefined;
  },
} as Nexus;

export default function IntlNexus() {
  const { t, raw, rich, markup } = useTranslations();
  const {
    t: remoteT,
    raw: remoteRaw,
    rich: remoteRich,
    markup: remoteMarkup,
  } = useRemoteTranslations();
  const locale = useLocale() as I18N.LocaleType;

  nexus.local.t = t;
  nexus.local.raw = raw;
  nexus.local.rich = rich;
  nexus.local.markup = markup;

  nexus.remote.t = remoteT;
  nexus.remote.raw = remoteRaw;
  nexus.remote.rich = remoteRich;
  nexus.remote.markup = remoteMarkup;

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

export const remoteT: RemoteI18NReturnValue['t'] = (...args) => {
  return nexus.remote?.t(...args);
};

export const remoteRaw: RemoteI18NReturnValue['raw'] = (...args) => {
  return nexus.remote?.raw(...args);
};

export const remoteRich: RemoteI18NReturnValue['rich'] = (...args) => {
  return nexus.remote?.rich(...args);
};

export const remoteMarkup: RemoteI18NReturnValue['markup'] = (...args) => {
  return nexus.remote?.markup(...args);
};
