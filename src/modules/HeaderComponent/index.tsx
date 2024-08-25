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
        className={`layout-header top-0 left-0 w-full h-[88px] atPhone:h-[72px] z-[99] ${sticky !== false ? 'sticky' : ''} ${isTransparentBg ? 'bg-transparent' : 'bg-frontGround'}`}
      >
        <header className="w-full h-full flex items-center justify-between box-border pad:px-[36px] atPhone:px-[24px]">
          <HeaderMenu />
          <div className="header-tool flex gap-[20px]">
            {isLogin ? (
              <div className="flex gap-[20px]">
                <PortfolioPopover />
              </div>
            ) : (
              <LoginAndRegister className="atPhone:hidden" />
            )}
            <div className="flex gap-[20px] items-center">
              <div className="line h-[20px] w-[1px] bg-[var(--line)]"></div>
              <LanguagePopover />
            </div>
          </div>
        </header>
      </div>
    </HeaderProvider>
  );
}
