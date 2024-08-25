'use client';

import { Popover, Button } from 'antd';
import AvtarIcon from '../assets/AvtarIcon.svg';
import Overstyle from '../style/overstyle.module.scss';
import DrawerContainer from './DrawerContainer';
import { useScreenChecker } from '@/hooks/useScreenChecker';
import useTranslations from '@/hooks/useTranslations';
import useHeaderConfig from '@/modules/HeaderComponent/hooks/useHeaderConfig';

export default function PortfolioPopover() {
  const { userInfo, logout } = useHeaderConfig();
  const { t } = useTranslations();
  const { isPC } = useScreenChecker();

  const Content = () => (
    <div className="asset-popover-content px-[12px] pb-[16px] pt-[4px] pc:w-[296px] border-box">
      <div className="flex gap-[24px] py-[16px] mb-[8px]">
        <div>
          <span className="text-titleText text-[24px] leading-[32px] font-chakra-600 break-all">
            {userInfo?.username}
          </span>
        </div>
      </div>
      <Button
        type="primary"
        ghost
        className="w-full mt-[20px] border-line hover:bg-blockPrimary"
        onClick={() => logout?.()}
      >
        {t('common.header.logOut')}
      </Button>
    </div>
  );

  return isPC ? (
    <Popover
      overlayClassName={Overstyle['header-popover']}
      trigger={'hover'}
      content={<Content />}
    >
      <span className="cursor-pointer">
        <AvtarIcon className="w-[24px] common-hover-transition" />
      </span>
    </Popover>
  ) : (
    <DrawerContainer content={<Content />}>
      <AvtarIcon className="w-[24px] cursor-pointer" />
    </DrawerContainer>
  );
}
