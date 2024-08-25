import { useCallback } from 'react';
import { useLocale } from 'next-intl';
import { setLocaleCookie } from '@/utils/i18nUtils';
import { usePathname, useRouter } from '@/utils/navigation';
import { I18N_LOCALES, PLATFORM_UI_I18N_STORE_KEY } from '@/enums/i18n';
import useSearchParams from '@/hooks/useSearchParams';

export default function useChangeLocale() {
  const pathname = usePathname();
  const locale = useLocale() as I18N.LocaleType;
  const params = useSearchParams();
  const { push, replace } = useRouter();
  const changeLocale: Global.LocaleChangeFunction = useCallback(
    (locale, useReplace = false) => {
      if (I18N_LOCALES.includes(locale)) {
        const api = useReplace ? replace : push;
        const paramsString = params.toString();
        const href = paramsString ? `${pathname}?${paramsString}` : pathname;

        setLocaleCookie(locale, PLATFORM_UI_I18N_STORE_KEY);
        api(href, { locale });
      }
    },
    [push, replace, pathname, params],
  );

  return {
    currentLocale: locale,
    changeLocale,
  };
}
