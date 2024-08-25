'use client';

import { PropsWithChildren } from 'react';
import { SearchParamsContext } from '@/context/SearchParamsContext';

export const SearchParamsProvider = (
  props: PropsWithChildren<{ value: SearchParamsContext }>,
) => {
  const { value, children } = props;
  return (
    <SearchParamsContext.Provider value={value}>
      {children}
    </SearchParamsContext.Provider>
  );
};
