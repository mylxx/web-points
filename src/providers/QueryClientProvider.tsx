'use client';

import { PropsWithChildren } from 'react';
import {
  QueryClientProvider as OriginQueryClientProvider,
  QueryClient,
} from 'react-query';

const queryClient = new QueryClient();

export default function QueryClientProvider(props: PropsWithChildren) {
  return (
    <OriginQueryClientProvider client={queryClient}>
      {props.children}
    </OriginQueryClientProvider>
  );
}
