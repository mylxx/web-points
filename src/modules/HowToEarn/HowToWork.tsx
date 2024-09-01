'use client';
import useTranslations from '@/hooks/useTranslations';

export default function HowToWork() {
  const { t } = useTranslations();
  return (
    <div className="w-full text-titleText">
      <div className="pc:px-[20px] mobile:px-[12px] text-titleText font-500 pc:text-[24px] pc:mb-[20px] mobile:text-[20px] mobile:mb-[10px]">
        {t('scan_how_works')}
      </div>
      <div className="break-words bg-backGround text-[16px] leading-[32px] pc:min-h-[106px] p-[20px] rounded-[16px]">
        {t('scan_scan_to_earn_description')}
      </div>
    </div>
  );
}
