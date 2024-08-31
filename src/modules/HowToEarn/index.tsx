'use client';
import { useRef, useState } from 'react';
import { Button } from 'antd';
import SVGWrapper from '@/components/SVGWrapper';
import { useRouter } from '@/utils/navigation';
import HowToEarnModule from './HowToEarnModule';
import HowToWork from './HowToWork';
import MerchantModal from './MerchantModal';
import Partners from './Partners';
import UploadModal from './UploadModal';
import WhatCanUpload from './WhatCanUpload';
import Back from '@/assets/images/howToEarn/Back.svg';
// import useTranslations from '@/hooks/useTranslations';
export default function HowToEarn() {
  const [previewSrc, setPreviewSrc] = useState(''); // 图片预览url
  const [fileInfo, setFileInfo] = useState<any>(null); // 上传文件信息
  const [formInfo, setFormInfo] = useState<any>(null); // 表单信息
  const [isSkip, setIsSkip] = useState(0); // 2:跳过，1:继续
  const { push } = useRouter();

  // const { t } = useTranslations();
  const merchantModalRef = useRef<MODAL.ModalActions>(null);
  const showMerchantModal = () => {
    merchantModalRef.current?.showModal();
  };
  const uploadModalRef = useRef<MODAL.ModalActions>(null);
  const showUploadModal = (
    preview: string,
    file: any,
    isSkip: number,
    formInfo: any,
  ) => {
    setPreviewSrc(preview);
    setFileInfo(file);
    setIsSkip(isSkip);
    setFormInfo(formInfo);
    merchantModalRef.current?.hideModal();
    uploadModalRef.current?.showModal();
  };
  // 上传弹窗选择reselect后重新生成图片 - 在这里重置一下
  const resetPreviewSrc = (preview: any) => {
    setPreviewSrc(preview);
  };
  // 上传弹窗选择reselect后重新生成图片信息 - 在这里重置一下
  const resetFileInfo = (file: any) => {
    setFileInfo(file);
  };

  const back = () => {
    push('/');
  };

  return (
    <div className="w-full mt-[80px] mb-[256px]">
      {/* nav */}
      <div className="flex justify-between items-center mb-[30px]">
        <div
          className="flex gap-[10px] items-center cursor-pointer opacity-[0.4]"
          onClick={back}
        >
          <SVGWrapper className="h-[16px]">
            <Back />
          </SVGWrapper>
          <div className="text-[18px] text-titleText font-500">
            Scan to earn
          </div>
        </div>
        {/* 按钮 */}
        <Button
          type="primary"
          size="large"
          className="pc:w-[150px] text-titleText common-hover-transition"
          onClick={() => showMerchantModal()}
        >
          Upload Invoice
        </Button>
      </div>
      {/* content */}
      <div className="flex gap-[24px] mobile:gap-[40px] justify-between mobile:flex-col">
        <div className="w-[50%] mobile:w-full">
          <HowToEarnModule />
        </div>
        <div className="w-[50%] mobile:w-full">
          <HowToWork />
        </div>
      </div>
      <WhatCanUpload />
      <Partners />
      {/* 商户信息弹窗 */}
      <MerchantModal ref={merchantModalRef} showUploadModal={showUploadModal} />
      {/* 上传图片预览弹窗 */}
      <UploadModal
        ref={uploadModalRef}
        formInfo={formInfo}
        isSkip={isSkip}
        previewSrc={previewSrc}
        fileInfo={fileInfo}
        resetPreviewSrc={resetPreviewSrc}
        resetFileInfo={resetFileInfo}
      />
    </div>
  );
}
