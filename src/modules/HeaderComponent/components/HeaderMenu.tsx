'use client';

import Logo from '../assets/Logo.svg';
import useHeaderConfig from '@/modules/HeaderComponent/hooks/useHeaderConfig';

export default function HeaderMenu() {
  const { clickMenuCallBack } = useHeaderConfig();

  return (
    <div className="flex flex-shrink-0 h-full items-center gap-[40px]">
      <Logo
        className="flex-shrink-0 w-[48px] h-[48px] atPhone:w-[44px] atPhone:h-[48px] cursor-pointer hover:opacity-[0.8]"
        onClick={() => {
          clickMenuCallBack?.({ path: '/' });
        }}
      />
    </div>
  );
}
