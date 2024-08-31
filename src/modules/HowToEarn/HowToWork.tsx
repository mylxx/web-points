'use client';
// import useTranslations from '@/hooks/useTranslations';

export default function HowToWork() {
  // const { t } = useTranslations();
  return (
    <div className="w-full text-titleText">
      <div className="pc:px-[20px] mobile:px-[12px] text-titleText font-500 pc:text-[24px] pc:mb-[20px] mobile:text-[20px] mobile:mb-[10px]">
        How does Scan-to-Earn Work?
      </div>
      <div className="break-words bg-backGround text-[16px] leading-[32px] pc:min-h-[106px] p-[20px] rounded-[16px]">
        PolyFlow Scan-to-Earn enables users to earn PolyFlow Points by simply
        scanning the real-world receipts or onchain transaction records. This
        process involves an AI-Powered system that examines and processes
        scanned documents. By rewarding users for these actions, PolyFlow aims
        to promote Crypto payment in day-to-day transactions and bridge the gap
        between Crypto and Real-World applications.
      </div>
    </div>
  );
}
