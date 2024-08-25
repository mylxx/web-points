import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { I18N_LOCALES } from '@/enums/i18n';

export const { Link, redirect, usePathname, useRouter, permanentRedirect } =
  createSharedPathnamesNavigation<typeof I18N_LOCALES>({
    locales: I18N_LOCALES,
  });

export const jumpTo = (
  domain: string,
  path?: string,
  query?: Record<string, any>,
) => {
  const urlParams = new URLSearchParams();
  query &&
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        urlParams.append(key, value);
      }
    });

  window.location.href =
    `${domain}/${path}` +
    (urlParams.size > 0 ? `?${urlParams.toString()}` : '');
};

