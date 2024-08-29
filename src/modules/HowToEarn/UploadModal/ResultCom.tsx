import React from 'react';
import { Divider, Button } from 'antd';
import SVGWrapper from '@/components/SVGWrapper';
import { useRouter } from '@/utils/navigation';
import ResultSuccess from '@/assets/images/howToEarn/ResultSuccess.svg';
import Share from '@/assets/images/howToEarn/Share.svg';
import './index.scss';
import { useClipboard } from '@/hooks/useClipboard';

const ResultCom: React.FC<{ result: any }> = (result) => {
  console.log(result);
  const { clipboard } = useClipboard();
  const { push } = useRouter();

  return (
    <div className="flex flex-col justify-center items-center mb-[16px]">
      <SVGWrapper className="w-[92px] h-[92px] pt-[9px]">
        <ResultSuccess />
      </SVGWrapper>
      <div className="text-[18px] font-500 text-titleText mb-[30px] mt-[20px]">
        Invoice uploaded successfully
      </div>
      <Divider plain className="border-[#424242]" />
      <div className="flex w-full">
        <div className="w-[50%] py-[20px] flex flex-col justify-center items-center">
          <div className="text-[16px] text-descriptionText mb-15px">
            You get
          </div>
          <div className="text-titleText text-[48px]">5,000</div>
          <div className="text-titleText text-[14px]">Points</div>
        </div>
        <Divider plain className="border-[#424242] h-auto" type="vertical" />
        <div className="w-[50%] py-[20px] flex flex-col justify-center items-center">
          <div className="text-[16px] text-descriptionText mb-15px">
            The counterparty gets
          </div>
          <div className="text-titleText text-[48px]">5,000</div>
          <div className="text-titleText text-[14px]">Points</div>
        </div>
      </div>
      <Divider plain className="border-[#424242]" />
      <Button
        className="w-full h-[54px] mb-[10px] mt-[30px] flex justify-center gap-[10px] items-center"
        type="primary"
        size="large"
        onClick={() => clipboard('wffwefffwfe' || '')}
      >
        Share my Joy
        <SVGWrapper className="w-[14px] h-[14px]">
          <Share />
        </SVGWrapper>
      </Button>
      <Button
        className="w-full h-[54px]  text-[#8A8B8D] bg-transparent border-[#8A8B8D]"
        size="large"
        onClick={() => push('/')}
      >
        Back to Homepage
      </Button>
    </div>
  );
};
export default ResultCom;
