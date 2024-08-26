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
        className={`layout-header top-0 left-0 w-full h-[60px] mobile:h-[44px] z-[99] ${sticky !== false ? 'sticky' : ''} ${isTransparentBg ? 'bg-transparent' : 'bg-frontGround'}`}
      >
        <header className="w-full h-full flex items-center justify-between box-border px-[28px] mobile:px-[16px]">
          <HeaderMenu />
          <div className="header-tool flex gap-[8px]">
            {/* 插一个按钮在这边吧 */}
            <div
              className="gradient-border pc:h-[46px] pc:rounded-[12px] pc:border-[3px] mobile:h-[32px] mobile:rounded-[6px] mobile:border-[1px] cursor-pointer"
              onClick={() => window?.open('www.baid.com', '_blank')}
            >
              <div className="flex justify-center items-center pc:gap-[10px] pc:px-[24px] pc:rounded-[12px] mobile:gap-[2px] mobile:px-[12px] mobile:rounded-[8px] h-full bg-backGround">
                <span>Payment IDs</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.652174 1.30435C0.291988 1.30435 5e-08 1.01236 5e-08 0.652174C5e-08 0.291988 0.291988 0 0.652174 0H9.34783C9.70801 0 10 0.291988 10 0.652174V9.34783C10 9.70801 9.70801 10 9.34783 10C8.98764 10 8.69565 9.70801 8.69565 9.34783V2.22666L1.11333 9.80898C0.858641 10.0637 0.445707 10.0637 0.191017 9.80898C-0.0636723 9.55429 -0.0636723 9.14136 0.191017 8.88667L7.77334 1.30435H0.652174Z"
                    fill="#8A8B8D"
                  />
                </svg>
              </div>
            </div>
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
