'use client';

import { Popover } from 'antd';
import Logout from '../assets/Logout.svg';
import Overstyle from '../style/overstyle.module.scss';
import useTranslations from '@/hooks/useTranslations';
import useHeaderConfig from '@/modules/HeaderComponent/hooks/useHeaderConfig';

export default function PortfolioPopover() {
  const { userInfo, logout } = useHeaderConfig();
  const { t } = useTranslations();

  const Content = () => (
    <div className="asset-popover-content border-box">
      <div
        className="flex items-center gap-[10px] cursor-pointer common-hover-transition"
        onClick={() => logout?.()}
      >
        <div className="bg-[#3E3E3E] flex items-center justify-center w-[24px] h-[24px] rounded-[24px]">
          <Logout />
        </div>
        <div className="text-[14px]">{t('common.header.logOut')}</div>
      </div>
    </div>
  );

  return (
    <Popover
      overlayClassName={Overstyle['header-popover']}
      trigger={'hover'}
      content={<Content />}
      arrow={false}
      placement="bottomRight"
    >
      <div className="cursor-pointer common-hover-transition bg-backGround flex items-center justify-center pc:min-w-[204px] pc:h-[46px] pc:px-[32px] pc:rounded-[12px] pc: text-[16px] mobile:px-[6px] mobile:h-[36px] mobile:rounded-[10px] mobile:text-[12px]">
        {userInfo?.username || 'y3wink@gmal.com'}
      </div>
    </Popover>
  );
}
