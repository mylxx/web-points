'use client';
import { Popover } from 'antd';
import LangIcon from '../assets/LangIcon.svg';
import SelectedIcon from '../assets/SelectedIcon.svg';
import OverStyle from '../style/overstyle.module.scss';
import { LanguageMenu } from '../utils/LanguageConfig';
import useChangeLocale from '@/hooks/useChangeLocale';

export default function LanguagePopover() {
  const { currentLocale, changeLocale } = useChangeLocale();
  return (
    <Popover
      overlayClassName={OverStyle['header-popover']}
      trigger="hover"
      content={
        <div className="language-tigger flex flex-col gap-[8px] w-full">
          {LanguageMenu.map((item) => (
            <div
              key={item.key}
              className={`font-500 text-fs14 text-titleText px-[12px] py-[10px] min-w-[176px] box-border flex gap-[12px] items-center hover:bg-backGround rounded-[8px] hover:cursor-pointer w-full justify-between ${currentLocale === item.key ? 'bg-backGround' : ''}`}
              onClick={() => changeLocale(item.key)}
            >
              <span>{item.label}</span>
              <span className="w-[16px]">
                {currentLocale === item.key ? <SelectedIcon /> : ''}
              </span>
            </div>
          ))}
        </div>
      }
    >
      <div className="cursor-pointer common-hover-transition bg-backGround flex items-center justify-center pc:w-[46px] pc:h-[46px] pc:rounded-[12px] mobile:w-[32px] mobile:h-[32px] mobile:rounded-[8px]">
        <LangIcon className="pc:w-[28px] mobile:w-[22px]" />
      </div>
    </Popover>
  );
}
