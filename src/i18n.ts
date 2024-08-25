import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { getMessages } from '@/utils/getMessages';
import { I18N_LOCALES } from '@/enums/i18n';

export default getRequestConfig(async ({ locale }) => {
  if (!I18N_LOCALES.includes(locale as any)) notFound();
  const messages = await getMessages(locale as I18N.LocaleType);

  return {
    messages,
  };
});
