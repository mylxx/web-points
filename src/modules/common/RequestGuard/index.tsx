'use client';

// 这里仅用于全局数据存入store的请求

import { useRecoilValue } from 'recoil';
import NoSSR from '@/components/NoSSR';
import { countryListState } from '@/store';

function Guard() {
  useRecoilValue(countryListState);

  return null;
}

export default function RequestGuard() {
  return (
    <NoSSR>
      <Guard />
    </NoSSR>
  );
}
