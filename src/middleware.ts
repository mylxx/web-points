import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { isDev } from '@/utils/utils';
import { I18N_LOCALES, DEFAULT_LOCALE } from '@/enums/i18n';

const handleI18nRouting = createMiddleware({
  locales: I18N_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localeDetection: false,
});
export default function cusMiddlewareFn(request: NextRequest) {
  // request.headers.set('cus-url', request.url);
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  if (!I18N_LOCALES.some((itemLang) => pathname.startsWith('/' + itemLang))) {
    request.nextUrl.pathname = '/' + DEFAULT_LOCALE + pathname;
  }
  console.log('--------------------------------------');
  console.log('isDev', request.nextUrl.pathname);

  // 开发环境 & 接口请求设置代理转发
  if (
    isDev &&
    I18N_LOCALES.some((itemLang) =>
      request.nextUrl.pathname.startsWith('/' + itemLang + '/api/'),
    )
  ) {
    const newPathname = request.nextUrl.pathname.replace(
      /\/(en|zh-HK|zh-CN)/,
      '',
    );
    console.log('+++++++++++++++', newPathname);
    return NextResponse.rewrite(
      `${process.env.NEXT_PUBLIC_REQUEST_DOMAIN}${newPathname}`,
    );
  }

  const response = handleI18nRouting(request);
  return response;
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(en|zh-HK|zh-CN|dev-lang)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|.*\\..*).*)',
  ],
};
