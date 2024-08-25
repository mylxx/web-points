'use client';
import React, { Suspense, lazy } from 'react';
import { Props } from './Table';

const LazyTable = lazy(() => import('./Table'));
export default function TableWithSkeleton(
  props: Props<any> & { Loading?: () => JSX.Element },
) {
  const { Loading, ...rest } = props;
  return (
    <Suspense fallback={Loading ? <Loading /> : null}>
      <LazyTable {...rest} />
    </Suspense>
  );
}
