'use client';

import { createContext } from 'react';

export interface SearchParamsContext {
  searchParams: Record<string, string>;
}

export const SearchParamsContext = createContext<SearchParamsContext>({
  searchParams: {},
});
