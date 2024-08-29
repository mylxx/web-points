import { Suspense } from 'react';
import { getLocale, getNow, getTimeZone, getMessages } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import IntlNexus from '@/utils/IntlNexus';
import MessageNexus from '@/utils/messageNexus';
import metaDataMap, {
  TypeGenerateMetadata,
  getCanonical,
} from '@/config/metaDataMap';
import { I18N_LOCALES } from '@/enums/i18n';
import AntdRegistry from '@/modules/common/AntdRegistry';
import AuthGuard from '@/modules/common/AuthGuard';
import CSSVariableRegistry from '@/modules/common/CSSVariableRegistry';
import DevTools from '@/modules/DevTools';
import { AntdConfigProvider } from '@/providers/AntdConfigProvider';
import NextIntlClientProvider from '@/providers/NextIntlClientProvider';
import QueryClientProvider from '@/providers/QueryClientProvider';
import RecoilRootProvider from '@/providers/RecoilRootProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import DefaultLangInterceptor from 'src/modules/common/DefaultLangInterceptor';
import Header from 'src/modules/Header';
import type { Viewport } from 'next';
// ssr 渲染不影响
/* eslint-disable */
// let launchIDEConfig = (ideName?: string) => '';
/* eslint-enable */
// ssr 渲染不影响

// export const dynamic = 'force-dynamic';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export function generateStaticParams() {
  return I18N_LOCALES.map((locale) => ({ locale }));
}

// export const metadata: Metadata = {};
export async function generateMetadata({
  params: { locale } = {},
}: TypeGenerateMetadata) {
  const canonicalPath = getCanonical();
  const metaData = metaDataMap[locale ?? 'en'];

  return {
    alternates: {
      canonical: canonicalPath,
    },
    ...metaData,
  };
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  console.log('[locale]--layout');
  const { children } = props;
  const [locale, now, timeZone] = await Promise.all([
    getLocale() as Promise<I18N.LocaleType>,
    getNow(),
    getTimeZone(),
  ]);
  const messages = await getMessages();

  unstable_setRequestLocale(locale);

  return (
    <CSSVariableRegistry>
      <AntdRegistry>
        <QueryClientProvider>
          <NextIntlClientProvider
            messages={messages}
            locale={locale}
            now={now}
            timeZone={timeZone}
          >
            <IntlNexus />
            <ThemeProvider>
              <AntdConfigProvider>
                <RecoilRootProvider>
                  <DefaultLangInterceptor />
                  {/* build-ignore-start */}
                  <DevTools />
                  {/* build-ignore-end */}
                  <Suspense>
                    <AuthGuard />
                  </Suspense>
                  <Header locale={locale} />
                  <MessageNexus>
                    <div className="flex-1">{children}</div>
                  </MessageNexus>
                </RecoilRootProvider>
              </AntdConfigProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </QueryClientProvider>
      </AntdRegistry>
    </CSSVariableRegistry>
  );
}
