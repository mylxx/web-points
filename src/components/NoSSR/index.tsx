'use client';

import { PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';

function NoSSR(props: PropsWithChildren) {
  return <>{props.children}</>;
}

export default dynamic(() => Promise.resolve(NoSSR), { ssr: false });
