import React from 'react';
import { Divider, Button } from 'antd';
import SVGWrapper from '@/components/SVGWrapper';
import { useRouter } from '@/utils/navigation';
import ResultSuccess from '@/assets/images/howToEarn/ResultSuccess.svg';
import Share from '@/assets/images/howToEarn/Share.svg';
import './index.scss';
import { useClipboard } from '@/hooks/useClipboard';
import useTranslations from '@/hooks/useTranslations';

const ResultCom: React.FC<{ result: any }> = (result: any) => {
  console.log(result);
  const { clipboard } = useClipboard();
  const { push } = useRouter();
  const { t } = useTranslations();

  return (
    <div className="flex flex-col justify-center items-center mb-[16px]">
      <SVGWrapper className="w-[92px] h-[92px] pt-[9px]">
        <ResultSuccess />
      </SVGWrapper>
      <div className="text-[18px] font-500 text-titleText mb-[30px] mt-[20px]">
        {t('upload_invoice_success')}
      </div>
      <Divider plain className="border-[#424242]" />
      <div className="flex w-full">
        <div className={`${result?.conterPatry ? 'pc:w-[50%]' : 'pc:w-full'} mobile:w-full py-[20px] flex flex-col justify-center items-center`}>
          <div className="text-[16px] text-descriptionText mb-15px">
            {t('upload_you_get')}
          </div>
          <div className="text-titleText text-[48px]">5,000</div>
          <div className="text-titleText text-[14px]">{t('upload_points')}</div>
        </div>
        {result?.conterPatry && (
          <div className="flex pc:w-[50%] mobile:w-full">
            <Divider plain className="border-[#424242] h-auto" type="vertical" />
            <div className="flex-1 py-[20px] flex flex-col justify-center items-center">
              <div className="text-[16px] text-descriptionText mb-15px">
                {t('upload_counterparty_gets')}
              </div>
              <div className="text-titleText text-[48px]">5,000</div>
              <div className="text-titleText text-[14px]">{t('upload_points')}</div>
            </div>
          </div>
        )}
      </div>
      <Divider plain className="border-[#424242]" />
      <Button
        className="w-full h-[54px] mb-[10px] mt-[30px] flex justify-center gap-[10px] items-center"
        type="primary"
        size="large"
        onClick={() => clipboard('wffwefffwfe' || '')}
      >
        {t('upload_sharing_is_caring')}
        <SVGWrapper className="w-[14px] h-[14px]">
          <Share />
        </SVGWrapper>
      </Button>
      <Button
        className="w-full h-[54px]  text-[#8A8B8D] bg-transparent border-[#8A8B8D]"
        size="large"
        onClick={() => push('/')}
      >
        {t('upload_back_homepage')}
      </Button>
    </div>
  );
};
export default ResultCom;
