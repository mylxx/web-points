'use client';

import React, { PropsWithChildren, useRef } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import getCSSVariables from '@/utils/getCSSVariables';

export default function CSSVariableRegistry(props: PropsWithChildren) {
  const inserted = useRef(false);

  useServerInsertedHTML(() => {
    if (inserted.current) return;
    inserted.current = true;
    return React.createElement('style', {
      id: 'css-variables',
      dangerouslySetInnerHTML: {
        __html: getCSSVariables(),
      },
    });
  });
  return props.children;
}
