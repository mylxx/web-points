'use client';

import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from '@/utils/navigation';
import DefDraw from './components/RecordNoData';
import AntdPagination from '@/modules/common/AntdPagination';
// import useTranslations from '@/hooks/useTranslations';
import { loginState, userInfoState } from '@/store';

export default function Records() {
  const [isLogin] = useRecoilState(loginState);
  const userInfo = useRecoilValue(userInfoState);
  console.log(userInfo);
  // const { t } = useTranslations();
  const { push } = useRouter();
  const pageChange = (current: number, size: number) => {
    console.log(current);
    console.log(size);
  };
  const list = [
    {
      date: +new Date(),
      balance: 122222222,
      reason: 'fwefefweeewffewfewfewfewfewfewfewf',
      amount: 3333333,
    },
    {
      date: +new Date(),
      balance: 122222222,
      reason: 'fwefefweeewffewfewfewfewfewfewfewf',
      amount: 3333333,
    },
    {
      date: +new Date(),
      balance: 122222222,
      reason: 'fwefefweeewffewfewfewfewfewfewfewf',
      amount: 3333333,
    },
    {
      date: +new Date(),
      balance: 122222222,
      reason: 'fwefefweeewffewfewfewfewfewfewfewf',
      amount: 3333333,
    },
  ];
  return (
    <div className="w-full">
      <div className="px-[20px]  pc:text-[24px] pc:mb-[24px] mobile:text-[20px] mobile:mb-[20px]">
        Record
      </div>
      {!isLogin ? (
        <div>
          <div className="bg-backGround pc:min-h-[106px] rounded-[16px]">
            {/* header */}
            <div className="flex gap-[8px] flex-nowrap items-center px-[32px] py-[14px]">
              <div className="text-[14px] text-descriptionText text-left w-[20%]">
                Date
              </div>
              <div className="text-[14px] text-descriptionText text-left w-[40%]">
                Reason
              </div>
              <div className="text-[14px] text-descriptionText text-left w-[20%]">
                Amount
              </div>
              <div className="text-[14px] text-descriptionText text-left w-[20%]">
                Balance
              </div>
            </div>
            {/* body */}
            <div>
              {list.length ? (
                list.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-[8px] border-t-[#424242] border-t-[1px] border-t-solid px-[32px] py-[19px] text-titleText"
                  >
                    <div className="text-[16px] leading-1 font-600 text-left w-[20%] break-words">
                      {item.date}
                    </div>
                    <div className="text-[16px] leading-1 font-600 text-left w-[40%] break-words">
                      {item.reason}
                    </div>
                    <div className="text-[16px] leading-1 font-600 text-left w-[20%] break-words">
                      {item.balance}
                    </div>
                    <div className="text-[16px] leading-1 font-600 text-left w-[20%] break-words">
                      {item.amount}
                    </div>
                  </div>
                ))
              ) : (
                <DefDraw />
              )}
            </div>
          </div>
          {list.length && (
            <div className="mt-[32px] flex justify-center">
              <AntdPagination
                total={10}
                curPage={1}
                pageSize={3}
                onChange={(current, size) => pageChange(current, size)}
              />
            </div>
          )}
        </div>
      ) : (
        <div
          className="cursor-pointer w-full h-full flex justify-center items-center min-h-[320px] bg-backGround rounded-[16px]"
          onClick={() => push('/connect')}
        >
          <DefDraw text="Please log in to view" />
        </div>
      )}
    </div>
  );
}
