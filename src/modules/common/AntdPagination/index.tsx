'use client';

import { Pagination } from 'antd';

const AntdPagination: React.FC<{
  curPage: number;
  total: number;
  pageSize: number;
  onChange: (current: number, size: number) => void;
}> = ({ total, curPage, pageSize, onChange }) => (
  <Pagination
    defaultCurrent={curPage}
    total={total}
    defaultPageSize={pageSize}
    // hideOnSinglePage
    onChange={(current, size) => onChange(current, size)}
  />
);

export default AntdPagination;
