import { useMemo } from 'react';
import { SortStatus } from '@/enums/table';

interface Props<T extends Record<string, any>> {
  dataSource: T[];
  sortColumn?: string;
  sortBy?: SortStatus;
  sortFuc?: (a: T, b: T, sortBy: SortStatus) => number;
}

const _getSortDataSource = <T extends Record<string, any>>(
  dataSource: T[],
  sortColumn: string,
  status: SortStatus,
  sortFuc?: (a: T, b: T, sortBy: SortStatus) => number,
) => {
  if (sortFuc && typeof sortFuc === 'function') {
    return dataSource.sort((a, b) => sortFuc(a, b, status));
  } else {
    if (!sortColumn) {
      return dataSource;
    }
    return status === SortStatus.UP
      ? dataSource.sort((a, b) => b[sortColumn] - a[sortColumn])
      : dataSource.sort((a, b) => a[sortColumn] - b[sortColumn]);
  }
};

export const useTableChange = <T extends Record<string, any>>(
  props: Props<T>,
) => {
  const {
    sortBy = SortStatus.NORMAL,
    dataSource = [],
    sortColumn = '',
    sortFuc,
  } = props;

  const sortDataSource = useMemo(() => {
    if (sortBy === SortStatus.NORMAL) {
      return [...dataSource];
    } else {
      const _sortDataSource = _getSortDataSource(
        dataSource,
        sortColumn,
        sortBy,
        sortFuc,
      );
      return _sortDataSource;
    }
  }, [sortBy, sortColumn, sortFuc, dataSource]);

  return {
    sortDataSource,
  };
};
