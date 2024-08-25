/**
 * 1、headerCellClassName 和 rowCellClassName的行为得保持一致，例如px、gap等属性值的设置
 */
import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import { deepClone } from '@/utils/utils';
import SortArrow from './sortArrow';
import { SortStatus } from '@/enums/table';
import { useScreenChecker } from '@/hooks/useScreenChecker';

type DataType = Record<string, any> & { dataKey?: string };

export interface ColumnType<T extends DataType> {
  title: string;
  dataIndex: string[];
  key?: string;
  headerCellClassName?: string;
  rowCellClassName?: string;
  headerRender?: (data?: ColumnType<T>) => JSX.Element | null;
  render?: (data: T) => JSX.Element | null;
  showOrderBy?: boolean;
  orderByChange?: (columnKey: string, order: SortStatus) => void;
  showSort?: boolean;
  sortReset?: boolean;
  align?: string; // start center end
  [key: string]: any;
}

export type Columns<T extends DataType> = {
  pcColumns?: ColumnType<T>[];
  padColumns?: ColumnType<T>[];
  phoneColumns?: ColumnType<T>[];
};

export interface Props<T extends DataType> {
  headerClassName?: string;
  rowClassName?: string;
  columns: Columns<T>;
  dataSource: T[];
  onRowClick?: (data: T) => void;
}

function HeaderCell<T extends DataType>(
  props: ColumnType<T> & {
    currentColumns?: ColumnType<T>[];
    resetColumns?: (columns: ColumnType<T>[]) => void;
  },
) {
  const {
    title,
    align,
    headerCellClassName = '',
    headerRender,
    showSort = false,
    dataIndex = [],
    orderByChange = () => {},
    resetColumns = () => {},
    sortReset = false,
    currentColumns = [],
  } = props;

  const [status, setStatus] = useState(SortStatus.NORMAL);

  const matchSortObj = {
    [SortStatus.NORMAL]: () => {
      setStatus(SortStatus.UP);
      orderByChange(dataIndex.join(','), SortStatus.UP);
    },
    [SortStatus.UP]: () => {
      setStatus(SortStatus.DOWN);
      orderByChange(dataIndex.join(','), SortStatus.DOWN);
    },
    [SortStatus.DOWN]: () => {
      setStatus(SortStatus.NORMAL);
      orderByChange(dataIndex.join(','), SortStatus.NORMAL);
    },
  };
  const resetOthersSortStatus = () => {
    currentColumns &&
      currentColumns.forEach((column) => {
        if (
          column.showSort &&
          column.dataIndex.join(',') !== dataIndex.join(',')
        ) {
          column.sortReset = true;
        } else {
          column.sortReset = false;
        }
      });
    currentColumns && resetColumns(deepClone(currentColumns));
  };
  const onClick = () => {
    matchSortObj[status]();
    resetOthersSortStatus();
  };

  useEffect(() => {
    if (showSort && sortReset) {
      setStatus(SortStatus.NORMAL);
    }
  }, [sortReset, showSort]);
  return (
    <div
      className={cls(
        'flex flex-row flex-1 text-fs14 text-[--description-text] items-center whitespace-nowrap justify-start',
        {
          [`justify-${align}`]: align,
          'cursor-pointer': showSort,
          [headerCellClassName]: !!headerCellClassName,
        },
      )}
      onClick={onClick}
    >
      {headerRender ? (
        headerRender(props)
      ) : (
        <span className="select-none">{title}</span>
      )}
      {showSort && (
        <div className="ml-4">
          <SortArrow status={status} />
        </div>
      )}
    </div>
  );
}

function RowCell<T extends DataType>(props: {
  data: T;
  columns: ColumnType<T>[];
  rowClassName: string;
  onRowClick: (data: T) => void;
}) {
  const { data, columns, rowClassName = '', onRowClick = () => {} } = props;
  return (
    <div
      className={cls(
        'flex flex-row items-center hover:bg-backGround hover:rounded-12 py-20 pc:hover:px-[20px] pc:hover:mx-[-20px] atPhone:w-full',
        { [`${rowClassName}`]: !!rowClassName },
      )}
      onClick={() => onRowClick(data)}
    >
      {columns.map((column: ColumnType<T>) => {
        return (
          <div
            className={cls('items-center flex flex-row flex-1 justify-start', {
              [`${column?.rowCellClassName}`]: !!column?.rowCellClassName,
              [`justify-${column?.align}`]: !!column?.align,
            })}
            key={column.dataIndex.join(',')}
          >
            {column?.render ? column?.render(data) : data[column.dataIndex[0]]}
          </div>
        );
      })}
    </div>
  );
}

function Table<T extends DataType>(props: Props<T>) {
  const {
    columns,
    dataSource = [],
    headerClassName = '',
    rowClassName = '',
    onRowClick = () => {},
  } = props;
  const [currentColumns, setcurrentColumns] = useState<ColumnType<T>[]>([]);
  const { isPC, isPhone } = useScreenChecker();
  const { pcColumns, phoneColumns } = columns;

  useEffect(() => {
    isPC && pcColumns && pcColumns?.length > 0 && setcurrentColumns(pcColumns);
  }, [isPC, pcColumns]);

  useEffect(() => {
    isPhone &&
      phoneColumns &&
      phoneColumns?.length > 0 &&
      setcurrentColumns(phoneColumns);
  }, [isPhone, phoneColumns]);

  return (
    <div className="flex flex-col w-ful">
      <div
        className={cls('flex flex-row w-full items-center select-none', {
          [headerClassName]: !!headerClassName,
        })}
      >
        {currentColumns.map((column) => (
          <HeaderCell
            key={column?.dataIndex.join(',')}
            {...column}
            currentColumns={currentColumns}
            resetColumns={(columns) => {
              setcurrentColumns(columns);
            }}
          />
        ))}
      </div>
      {dataSource.map((data, i) => (
        <RowCell
          key={data.dataKey || i}
          data={data}
          columns={currentColumns}
          rowClassName={rowClassName}
          onRowClick={isPhone ? onRowClick : () => {}}
        />
      ))}
    </div>
  );
}

export default React.memo(Table);
