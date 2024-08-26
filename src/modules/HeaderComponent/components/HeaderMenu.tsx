'use client';

import Logo from '../assets/Logo.svg';
import useHeaderConfig from '@/modules/HeaderComponent/hooks/useHeaderConfig';

export default function HeaderMenu() {
  const { clickMenuCallBack } = useHeaderConfig();

  return (
    <div className="flex flex-shrink-0 h-full items-center gap-[40px]">
      <Logo
        className="flex-shrink-0 pc:h-[46px] mobile:h-[28px] cursor-pointer hover:opacity-[0.8]"
        onClick={() => {
          clickMenuCallBack?.({ path: '/' });
        }}
      />
      {/* 未来其他菜单 */}
    </div>
  );
}
