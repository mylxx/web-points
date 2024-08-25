'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { extractLanguagePaths, getPlateFormUILocale } from '@/utils/i18nUtils';
import { useRouter } from '@/utils/navigation';
import { LocaleCookieTypeUnio, PLATFORM_UI_I18N_STORE_KEY } from '@/enums/i18n';
import useChangeLocale from '@/hooks/useChangeLocale';

export default function DefaultLangInterceptor() {
  const { changeLocale } = useChangeLocale();
  const { push } = useRouter();
  useEffect(() => {
    const cookiesLocale = Cookies.get(PLATFORM_UI_I18N_STORE_KEY);
    const cookieLang = cookiesLocale
      ? getPlateFormUILocale(cookiesLocale as LocaleCookieTypeUnio)
      : 'en';
    const lang = extractLanguagePaths(location.href);

    if (!lang && cookiesLocale) {
      setTimeout(() => {
        changeLocale(cookieLang as I18N.LocaleType);
      }, 100);
      // changeLocale(cookieLang as I18N.LocaleType);
    }
  }, [changeLocale, push]);

  return <></>;
}
