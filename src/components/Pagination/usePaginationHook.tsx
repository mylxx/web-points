import { useMemo } from 'react';
function usePaginationHook<T>(props: {
  dataSource: T[];
  pageNum: number;
  pageSize?: number;
}) {
  const { dataSource, pageNum, pageSize = 10 } = props;
  const currentPageData = useMemo(
    () => dataSource.slice((pageNum - 1) * pageSize, pageNum * pageSize),
    [dataSource, pageNum, pageSize],
  );

  return {
    currentPageData,
    pageNum,
    pageSize,
  };
}

export default usePaginationHook;
