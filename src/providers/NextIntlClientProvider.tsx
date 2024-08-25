'use client';

import { NextIntlClientProvider as OriginNextIntlClientProvider } from 'next-intl';
const NextIntlClientProvider: typeof OriginNextIntlClientProvider = (props) => {
  return (
    <OriginNextIntlClientProvider
      {...props}
      getMessageFallback={({ key }) => key.replace(/%%/g, '.')}
    >
      {props.children}
    </OriginNextIntlClientProvider>
  );
};

export default NextIntlClientProvider;
