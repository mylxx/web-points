'use client';
import { Image } from 'antd';
import SVGWrapper from '@/components/SVGWrapper';
import Tips from '@/assets/images/howToEarn/Tips.svg';
import useTranslations from '@/hooks/useTranslations';

export default function Partner() {
  const { t } = useTranslations();
  const partnerList = [
    {
      src: '/images/partner/ALDI.png',
      title: 'ALDI.png',
    },
    {
      src: '/images/partner/Amazon.png',
      title: 'Amazon.png',
    },
    {
      src: '/images/partner/Chipotle.png',
      title: 'Chipotle.png',
    },
    {
      src: '/images/partner/domino.png',
      title: 'domino.png',
    },
    {
      src: '/images/partner/goodnessCoffee.png',
      title: 'goodnessCoffee.png',
    },
    {
      src: '/images/partner/IKEA.png',
      title: 'IKEA.png',
    },
    {
      src: '/images/partner/KFC.png',
      title: 'KFC.png',
    },
    {
      src: '/images/partner/Levi.png',
      title: 'Levi.png',
    },
    {
      src: "/images/partner/Lowe's.png",
      title: "Lowe's.png",
    },
    {
      src: '/images/partner/McDonald.png',
      title: 'McDonald.png',
    },
    {
      src: '/images/partner/Pizzahut.png',
      title: 'Pizzahut.png',
    },
    {
      src: '/images/partner/Saibaiwei.png',
      title: 'Saibaiwei.png',
    },
    {
      src: '/images/partner/Sephora.png',
      title: 'Sephora.png',
    },
    {
      src: '/images/partner/Starbucks.png',
      title: 'Starbucks.png',
    },
    {
      src: '/images/partner/TacoBell.png',
      title: 'TacoBell.png',
    },
    {
      src: '/images/partner/Uber.png',
      title: 'Uber.png',
    },
    {
      src: '/images/partner/urgerKing.png',
      title: 'urgerKing.png',
    },
    {
      src: '/images/partner/Walmart.png',
      title: 'Walmart.png',
    },
  ];
  return (
    <div className="w-full text-titleText pc:mt-[50px] mobile:mt-[40px]">
      <div className="pc:px-[20px] mobile:px-[12px] text-titleText font-500 pc:text-[24px] pc:mb-[20px] mobile:text-[20px] mobile:mb-[10px]">
        {t('scan_get_extra_points')}
      </div>

      <div className="p-[20px] rounded-[16px]  bg-backGround">
        <div className="flex  flex-wrap  items-center justify-center gap-[10px] ">

          {partnerList.map((item, index) => (
            <div
              className="box-border text-[0] pc:min-w-[182px] pc:h-[80px] pc:w-[15%] mobile:w-[33%] max-w-[96px] mobile:h-[44px] gap-[6px] rounded-[12px] overflow-hidden bg-[#454549]"
              key={index}
            >
              <Image
                src={item.src}
                alt={item.title}
                className="w-full h-full rounded-[12px]"
              />
            </div>
          ))}
        </div>
        <div className='pc:mb-[10px] pc:mt-[30px] mobile:mt-[20px] mobile:w-[60%] mobile:mx-auto flex pc:items-center mobile:items-start justify-center gap-[5px]'>
          <SVGWrapper className="h-[11px] w-[11px]">
            <Tips />
          </SVGWrapper>
          <div className="text-descriptionText text-[12px] leading-[1]">
            {t('scan_partner_logo')}
          </div>
        </div>
      </div>
    </div>
  );
}
