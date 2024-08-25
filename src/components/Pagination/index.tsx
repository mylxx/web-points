import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Pagination as AntdPagination, PaginationProps } from 'antd';
import cls from 'classnames';
import useTranslations from '@/hooks/useTranslations';
import './pagination.scss';
function Pagination(
  props: PaginationProps & { algin?: 'start' | 'center' | 'end' },
) {
  const { t } = useTranslations();

  const {
    current,
    pageSize = 10,
    algin = 'center',
    total = 0,
    onChange,
    hideOnSinglePage = true,
    ...rest
  } = props;

  const itemRender: PaginationProps['itemRender'] = (
    page,
    type,
    originalElement,
  ) => {
    if (type === 'prev') {
      return (
        <a
          className={`${current === 1 ? 'text-[--description-text]' : 'text-titleText'} select-none mr-40`}
        >
          <LeftOutlined className="mr-8" />
          {t('markets.pagination.prePage')}
        </a>
      );
    }
    if (type === 'next') {
      return (
        <a
          className={`${current === parseInt('' + total / pageSize) + (total % pageSize != 0 ? 1 : 0) ? 'text-descriptionText' : 'text-titleText'} select-none  ml-40`}
        >
          {t('markets.pagination.nextPage')}
          <RightOutlined className="ml-8" />
        </a>
      );
    }
    if (type === 'page') {
      return (
        <div
          className={`flex items-center text-titleText font-bai-600 justify-center w-full h-full ${page === current && 'bg-backGround rounded-full'}`}
        >
          {page}
        </div>
      );
    }
    return originalElement;
  };

  return (
    <div
      className={cls('flex flex-row w-full justify-start', {
        [`justify-${algin}`]: algin,
      })}
    >
      <AntdPagination
        {...rest}
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        showSizeChanger={false}
        itemRender={itemRender}
        hideOnSinglePage={hideOnSinglePage}
      />
    </div>
  );
}

export default React.memo(Pagination);
