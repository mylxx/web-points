'use client';

import { PropsWithChildren } from 'react';
import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';

export default function RecoilRootProvider(props: PropsWithChildren) {
  return (
    <RecoilRoot>
      <RecoilNexus />
      {props.children}
    </RecoilRoot>
  );
}
