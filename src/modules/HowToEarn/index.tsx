'use client';
import { useRef, useState } from 'react';
import { Button } from 'antd';
import MerchantModal from './MerchantModal';
import UploadModal from './UploadModal';
// import useTranslations from '@/hooks/useTranslations';
export default function HowToEarn() {
  const [previewSrc, setPreviewSrc] = useState(''); // 图片预览url
  const [fileInfo, setFileInfo] = useState<any>(null); // 上传文件信息
  const [formInfo, setFormInfo] = useState<any>(null); // 表单信息
  const [isSkip, setIsSkip] = useState(0); // 2:跳过，1:继续
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

  return (
    <div className="w-full">
      <div className="px-[20px] text-titleText pc:text-[24px] pc:mb-[24px] mobile:text-[20px] mobile:mb-[20px]">
        how to earn
      </div>
      <Button
        type="primary"
        size="large"
        // className="pc:w-[215px] common-hover-transition"
        className="pc:w-[215px] text-titleText"
        onClick={() => showMerchantModal()}
      >
        Upload
      </Button>
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
