'use client';
import HeaderMenu from './components/HeaderMenu';
import LanguagePopover from './components/LanguagePopover';
import PortfolioPopover from './components/PortfolioPopover';
import { HeaderProps } from './types/header.type';
import LoginAndRegister from '@/modules/HeaderComponent/components/LoginAndRegister';
import { HeaderProvider } from '@/modules/HeaderComponent/providers/HeaderProvider';

export default function Header(props: HeaderProps) {
  const { sticky, isLogin, isTransparentBg = false } = props;

  return (
    <HeaderProvider {...props}>
      <div
        className={`layout-header top-0 left-0 w-full h-[64px] z-[99] ${sticky !== false ? 'sticky' : ''} ${isTransparentBg ? 'bg-transparent' : 'bg-frontGround'}`}
      >
        <header className="w-full h-full flex items-center justify-between box-border px-[28px] mobile:px-[16px]">
          <HeaderMenu />
          <div className="header-tool flex gap-[8px]">
            <div className="flex items-center ">
              <LanguagePopover />
            </div>
            {!isLogin ? <PortfolioPopover /> : <LoginAndRegister />}
          </div>
        </header>
      </div>
    </HeaderProvider>
  );
}
