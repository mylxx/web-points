'use client';

import { Button, Tooltip } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import useTranslations from '@/hooks/useTranslations';
import { loginState, userInfoSelector } from '@/store';
import { useEffect } from 'react';

export default function MyPoints() {
  const [isLogin] = useRecoilState(loginState);
  const userInfo = useRecoilValue(userInfoSelector);
  const { t } = useTranslations();
  useEffect(() => {
    console.log('userInfo,', userInfo);
  }, []);
  return (
    <div className="w-full">
      <div className="px-[20px] text-titleText font-500 pc:text-[24px] pc:mb-[20px] mobile:text-[20px] mobile:mb-[10px]">
        My Points
      </div>
      {!isLogin ? (
        <div className="flex justify-between items-center bg-backGround pc:min-h-[106px] py-[28px] px-[20px] rounded-[16px]">
          <div className="text-[32px] text-titleText">3000</div>
          <Tooltip title={t('common.home.coming')} color="#454549">
            <Button
              type="primary"
              size="large"
              // className="pc:w-[215px] common-hover-transition"
              className="pc:w-[215px] text-titleText"
            >
              Voucher redemption
            </Button>
          </Tooltip>
        </div>
      ) : (
        <div className="flex items-center bg-backGround pc:min-h-[106px] py-[28px] px-[20px] rounded-[16px]">
          - -
        </div>
      )}
    </div>
  );
}
