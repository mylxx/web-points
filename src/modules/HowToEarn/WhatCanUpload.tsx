'use client';
import { Divider, Image } from 'antd';
import SVGWrapper from '@/components/SVGWrapper';
import Error from '@/assets/images/howToEarn/Error.svg';
import Right from '@/assets/images/howToEarn/Right.svg';
import useTranslations from '@/hooks/useTranslations';

export default function WhatCanUpload() {
  const { t } = useTranslations();
  const faitImgList = [
    {
      title: t('scan_bills'),
      src: '/images/howToEarn/bill.png',
      desc: t('scan_bills_description'),
    },
    {
      title: t('scan_online_commerce'),
      src: '/images/howToEarn/onlineCommerce.png',
      desc: t('scan_online_commerce_description'),
    },
    {
      title: t('scan_receipt'),
      src: '/images/howToEarn/receipt.png',
      desc: t('scan_receipt_description'),
    },
    {
      title: t('scan_business_contract'),
      src: '/images/howToEarn/businessContract.png',
      desc: '',
    },
  ];

  const croptyImgList = [
    {
      title: t('scan_web3_trading'),
      src: '/images/howToEarn/web3Wallet.png',
    },
    {
      title: t('scan_cex_trading'),
      src: '/images/howToEarn/cexTrading.png',
    },
    {
      title: t('scan_blockchain_trading'),
      src: '/images/howToEarn/blockchainTrading.png',
    },
    {
      title: t('scan_business_contracts'),
      src: '/images/howToEarn/businessContracts.png',
    },
  ];

  return (
    <div className="w-full text-titleText pc:mt-[50px] mobile:mt-[40px]">
      <div className="pc:px-[20px] mobile:px-[12px] text-titleText font-500 pc:text-[24px] pc:mb-[20px] mobile:text-[20px] mobile:mb-[10px]">
        {t('scan_upload_invoice')}
      </div>
      <div className="break-words bg-backGround text-[14px] leading-[20px] pc:min-h-[106px] rounded-[16px]">
        {/* title */}
        <div className="p-[20px] flex items-center gap-[10px]">
          <SVGWrapper className="h-[21px] w-[21px]">
            <Right />
          </SVGWrapper>
          <div className="text-[16px] font-500 text-titleText">
            {t('scan_payment_type')}
          </div>
        </div>
        <Divider plain className="border-[#454549] mb-[24px]" />
        <div className="flex justify-between mobile:flex-col">
          <div className="w-[50%]  mobile:w-full box-border px-[20px] mb-[34px] border-r-[1px] border-solid border-[#454549] mobile:border-none">
            {/* title */}
            <div className="text-descriptionText text-[12px] py-[20px]">
              {t('scan_fiat_receipts')}
            </div>
            {/* 下面的示例图 */}
            <div className="flex gap-[10px] flex-wrap mobile:justify-around">
              {faitImgList?.map((item, index) => (
                <div className="mobile:w-[150px] pc:w-[130px]" key={index}>
                  <div className=" rounded-[16px] overflow-hidden text-[0]">
                    <Image
                      src={item.src}
                      alt={item.title}
                      preview={{ destroyOnClose: true }}
                      className="h-[170px] w-[130px] mobile:h-[200px] mobile:w-[150px] shrink-0 rounded-[12px]"
                    />
                  </div>
                  <div className="text-titleText text-[12px] font-500">
                    {item.title}
                  </div>
                  {item.desc && (
                    <div className="text-descriptionText text-[12px]">
                      {item.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="w-[50%]  mobile:w-full box-border px-[20px]">
            {/* title */}
            <div className="text-descriptionText text-[12px] py-[20px]">
              {t('scan_crypto_receipts')}
            </div>
            {/* 下面的示例图 */}
            <div className="flex gap-[10px] flex-wrap mobile:justify-around">
              {croptyImgList?.map((item, index) => (
                <div className="mobile:w-[150px] pc:w-[130px]" key={index}>
                  <div className=" rounded-[16px] overflow-hidden text-[0]">
                    <Image
                      src={item.src}
                      alt={item.title}
                      preview={{ destroyOnClose: true }}
                      className="h-[170px] w-[130px] mobile:h-[200px] mobile:w-[150px] shrink-0 rounded-[12px]"
                    />
                  </div>
                  <div className="text-titleText text-[12px] font-500">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="bg-backGround  pc:min-h-[106px] rounded-[16px] flex items-center mobile:items-start gap-[10px] mt-[20px] px-[20px] py-[12px]">
        <SVGWrapper className="h-[21px] w-[21px]">
          <Error />
        </SVGWrapper>
        <div className="break-words text-titleText text-[16px] font-500">
          {t('upload_not_accepted')}
        </div>
      </div>
    </div>
  );
}
