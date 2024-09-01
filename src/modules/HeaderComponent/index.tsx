'use client';
import SVGWrapper from '@/components/SVGWrapper';
import GoIcon from './assets/GoIcon.svg';
import HeaderMenu from './components/HeaderMenu';
import LanguagePopover from './components/LanguagePopover';
import PortfolioPopover from './components/PortfolioPopover';
import { HeaderProps } from './types/header.type';
import useTranslations from '@/hooks/useTranslations';
import LoginAndRegister from '@/modules/HeaderComponent/components/LoginAndRegister';
import { HeaderProvider } from '@/modules/HeaderComponent/providers/HeaderProvider';
export default function Header(props: HeaderProps) {
  const { sticky, isLogin, isTransparentBg = false } = props;
  const { t } = useTranslations();

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
                <span className="text-titleText pc:text-[16px] mobile:text-[12px]">
                  {t('header_payment_ids')}
                </span>
                <SVGWrapper className="w-[10px] h-[10px]">
                  <GoIcon />
                </SVGWrapper>
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
