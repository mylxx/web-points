import { useContext, useEffect, useState } from 'react';
import { SearchParamsContext } from '@/context/SearchParamsContext';

export default function useSearchParams() {
  const { searchParams } = useContext(SearchParamsContext);
  const [params, setParams] = useState(new URLSearchParams(searchParams));

  useEffect(() => {
    setParams(new URLSearchParams(searchParams));
  }, [searchParams]);

  return params;
}
