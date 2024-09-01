import { ReactNode } from 'react';
// import Script from 'next/script';
import '@/styles/index.scss';

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <body className="dark min-h-[100vh] flex flex-col">{children}</body>
    </html>
  );
}
