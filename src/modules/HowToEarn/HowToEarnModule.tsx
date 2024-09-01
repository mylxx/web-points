'use client';
import AsyncImage from '@/components/AsyncImage';
import SVGWrapper from '@/components/SVGWrapper';
import ArrRight from '@/assets/images/howToEarn/ArrRight.svg';
import Step1 from '@/assets/images/howToEarn/Step1.png';
import Step2 from '@/assets/images/howToEarn/Step2.png';
import Step3 from '@/assets/images/howToEarn/Step3.png';
import useTranslations from '@/hooks/useTranslations';

export default function HowToEarnModule() {
  const { t } = useTranslations();
  return (
    <div className="w-full text-titleText">
      <div className="pc:px-[20px] mobile:px-[12px] text-titleText font-500 pc:text-[24px] pc:mb-[20px] mobile:text-[20px] mobile:mb-[10px]">
        {t('scan_how_to_earn')}
      </div>
      {/* mobile */}
      <div className="break-words bg-backGround text-[14px] leading-[20px] py-[20px] px-[12px] rounded-[16px] pc:hidden">
        <div className="text-[18px] text-left mb-[22px]">
          {t('scan_earn_points')}
        </div>
        <div className="flex gap-[10px] items-center">
          <AsyncImage
            src={Step1}
            alt="step"
            className="h-[40px] w-[40px] shrink-0"
          />
          <div className="flex-1 flex flex-col justify-center gap-[4px]">
            <div className="text-titleText text-[14px] font-700">{t('scan_step_1')}</div>
            <div className="text-descriptionText text-[14px] font-700">
              {t('common.header.login')}
            </div>
          </div>
        </div>
        <div className="h-[40px] w-[1px] ml-[19px] bg-[#444448] flex-1 relative">
          <SVGWrapper className="h-[13px] w-[13px]  absolute left-[-6px] top-[50%] translate-y-[-6px] rotate-90">
            <ArrRight />
          </SVGWrapper>
        </div>
        <div className="flex gap-[10px] items-center">
          <AsyncImage
            src={Step2}
            alt="step"
            className="h-[40px] w-[40px] shrink-0"
          />
          <div className="flex-1 flex flex-col justify-center gap-[4px]">
            <div className="text-titleText text-[14px] font-700">{t('scan_step_2')}</div>
            <div className="text-descriptionText text-[14px] font-700">
              {t('scan_scan_invoice')}
            </div>
          </div>
        </div>
        <div className="h-[40px] w-[1px] ml-[19px] bg-[#444448] flex-1 relative">
          <SVGWrapper className="h-[13px] w-[13px]  absolute left-[-6px] top-[50%] translate-y-[-6px] rotate-90">
            <ArrRight />
          </SVGWrapper>
        </div>
        <div className="flex gap-[10px] items-center">
          <AsyncImage
            src={Step3}
            alt="step"
            className="h-[40px] w-[40px] shrink-0"
          />
          <div className="flex-1 flex flex-col justify-center gap-[4px]">
            <div className="text-titleText text-[14px] font-700">{t('scan_step_3')}</div>
            <div className="text-descriptionText text-[14px] font-700">
              {t('scan_get_points')}
            </div>
          </div>
        </div>
      </div>
      {/* pc */}
      <div className="break-words bg-backGround text-[14px] leading-[20px] pc:min-h-[106px] p-[20px] rounded-[16px] mobile:hidden">
        <div className="text-[18px] text-center mb-[24px]">
          {t('scan_earn_points')}
        </div>
        <div className="px-[36px] flex items-center justify-between">
          <AsyncImage
            src={Step1}
            alt="step"
            className="h-[60px] w-[60px] shrink-0"
          />
          <div className="h-[1px] bg-[#444448] flex-1 relative">
            <SVGWrapper className="h-[13px] w-[13px] absolute top-[-6px] right-[50%]">
              <ArrRight />
            </SVGWrapper>
          </div>
          <AsyncImage
            src={Step2}
            alt="step"
            className="h-[60px] w-[60px] shrink-0"
          />
          <div className="h-[1px] bg-[#444448] flex-1 relative">
            <SVGWrapper className="h-[13px] w-[13px] absolute top-[-6px] right-[50%]">
              <ArrRight />
            </SVGWrapper>
          </div>
          <AsyncImage
            src={Step3}
            alt="step"
            className="h-[60px] w-[60px] shrink-0"
          />
        </div>
        <div className="px-[36px] flex items-center justify-between mt-[15px]">
          <div className="text-center w-[60px]">{t('scan_step_1')}</div>
          <div className="text-center w-[60px]">{t('scan_step_2')}</div>
          <div className="text-center w-[60px]">{t('scan_step_3')}</div>
        </div>
        <div className="flex  justify-between mt-[15px]">
          <div className="text-center text-[14px] text-descriptionText  w-[150px] pr-[22px]">
            {t('common.header.login')}
          </div>
          <div className="text-center text-[14px] text-descriptionText  w-[150px]">
            {t('scan_scan_invoice')}
          </div>
          <div className="text-center text-[14px] text-descriptionText  w-[150px]">
            {t('scan_get_points')}
          </div>
        </div>
      </div>
    </div>
  );
}
