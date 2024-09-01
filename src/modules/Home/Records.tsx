'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from '@/utils/navigation';
import DefDraw from './components/RecordNoData';
import { getPointsList } from '@/apis';
import useTranslations from '@/hooks/useTranslations';
import AntdPagination from '@/modules/common/AntdPagination';
// import dayjs from 'dayjs'
import { loginState } from '@/store';

export default function Records() {
  const [list, setList] = useState<any>([]);
  const [total, setTotal] = useState<any>(0);
  const [page, setPage] = useState<any>(1);
  const [limit, setLmit] = useState<any>(12);
  const [isLogin] = useRecoilState(loginState);

  const { t } = useTranslations();
  const { push } = useRouter();

  useEffect(() => {
    if (!isLogin) {
      return;
    }
    getList();
  }, [isLogin]);

  const getList = (params?: any) => {
    const data = {
      page: params.page || page,
      limit: params.limit || limit,
    };
    getPointsList(data).then((res) => {
      const { code, data } = res;
      if (code === '0') {
        // setList(data?.list)
        setList([
          {
            points: 10, //总积分
            id: '1', //记录ID
            user_id: '1829899987500474377', //用户ID
            points_type: 'invoice', //pointsType
            reason_language_code: '1', //多语言代码
            change_points: 10, //积分变动
            create_date: '2024-08-31 23:59:43',
            update_date: '2024-08-31 23:59:43',
          },
        ]);
        setPage(data.page);
        setLmit(data.limit);
        setTotal(data.total);
      }
    });
  };
  const pageChange = (current: number, size: number) => {
    // setPage(current)
    // setLmit(size)
    getList({ page: current, limit: size });
  };
  return (
    <div className="w-full">
      <div className="px-[20px] text-titleText font-500  pc:text-[24px] pc:mb-[20px] mobile:text-[20px] mobile:mb-[10px]">
        {t('points_records')}
      </div>
      {isLogin ? (
        <div className="overflow-x-auto">
          <div className="bg-backGround pc:min-h-[320px] rounded-[16px] mobile:min-w-[600px]">
            {/* header */}
            <div className="flex gap-[8px] flex-nowrap items-center px-[32px] py-[14px]">
              <div className="text-[14px] text-descriptionText text-left w-[20%]">
                {t('points_date')}
              </div>
              <div className="text-[14px] text-descriptionText text-left w-[40%]">
                {t('points_reason')}
              </div>
              <div className="text-[14px] text-descriptionText text-left w-[20%]">
                {t('points_amount')}
              </div>
              <div className="text-[14px] text-descriptionText text-left w-[20%]">
                {t('points_balance')}
              </div>
            </div>
            {/* body */}
            <div>
              {!list.length ? (
                list.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="flex gap-[8px] border-t-[#424242] border-t-[1px] border-t-solid px-[32px] py-[19px] text-titleText"
                  >
                    <div className="text-[16px] leading-1 font-600 text-left w-[20%] break-words">
                      {/* {dayjs(item.date).format('YYYY-MM-DD HH:mm')} */}
                      {item.update_date}
                    </div>
                    <div className="text-[16px] leading-1 font-600 text-left w-[40%] break-words">
                      {item.points_type}
                    </div>
                    <div className="text-[16px] leading-1 font-600 text-left w-[20%] break-words">
                      {item.points}
                    </div>
                    <div className="text-[16px] leading-1 font-600 text-left w-[20%] break-words">
                      {item.change_points}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center min-h-[250px]">
                  <DefDraw />
                </div>
              )}
            </div>
          </div>
          {list.length && (
            <div className="mt-[32px] flex justify-center overflow-hidden">
              <AntdPagination
                total={total}
                curPage={page}
                pageSize={limit}
                onChange={(current, size) => pageChange(current, size)}
              />
            </div>
          )}
        </div>
      ) : (
        <div
          className="cursor-pointer w-full h-full flex justify-center items-center min-h-[320px] bg-backGround rounded-[16px]"
          onClick={() => push('/login')}
        >
          <DefDraw text={t('points_login_to_view')} />
        </div>
      )}
    </div>
  );
}
