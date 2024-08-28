import React, { useState, useRef } from 'react';
import { Upload, message, Button } from 'antd';
import { UploadProps } from 'antd/es/upload';
import UploadModal from '../UploadModal'
// import { goLogin } from '@/apis';
import './index.scss';

const UploadBtn: React.FC<any> = (props) => {
  const { formIns, hideModal } = props
  const [previewSrc, setPreviewSrc] = useState('');
  const [fileInfo, setFileInfo] = useState<any>(null);
  const [isSkip, setIsSkip] = useState(0)
  const uploadModalRef = useRef<MODAL.ModalActions>(null);
  const showUploadModal = () => {
    uploadModalRef.current?.showModal();
  }

  const handleBeforeUpload = (file: File) => {
    // 检查文件类型和大小  
    const isLt30M = file.size / 1024 / 1024 < 30;
    if (!isLt30M) {
      message.error('图片大小不能超过 30MB!');
      return false;
    }

    const isImageOrPdf =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/bmp' ||
      file.type === 'application/pdf';
    if (!isImageOrPdf) {
      message.error('文件类型必须为 JPG, PNG, BMP 或 PDF!');
      return false;
    }
    // 生成预览链接  
    const preview = URL.createObjectURL(file);
    setPreviewSrc(preview);
    showUploadModal()
    setFileInfo(file)
    return false;
  };

  const uploadProps: UploadProps = {
    name: 'file',
    listType: 'text',
    className: 'avatar-uploader',
    showUploadList: false,
    beforeUpload: handleBeforeUpload,
  };

  const goUploadModel = (isSkip: number) => {
    hideModal()
    setIsSkip(isSkip)
  }

  return (
    <>
      <Upload {...uploadProps} className="w-full">
        <Button
          className="w-full mt-[12px] h-[54px]"
          type="primary"
          size="large"
          onClick={() => goUploadModel(1)}
        >
          Continue
        </Button>
      </Upload>

      <Upload {...uploadProps} className="w-full">
        <Button
          className="w-full mt-[10px] h-[54px] mb-[18px] text-[#8A8B8D] bg-transparent border-[#8A8B8D]"
          size="large"
          onClick={() => goUploadModel(2)}
        >
          Skip
        </Button>
      </Upload>
      <UploadModal ref={uploadModalRef} formIns={formIns} isSkip={isSkip} previewSrc={previewSrc} fileInfo={fileInfo} handleBeforeUpload={handleBeforeUpload} />

    </>
  );
};

export default UploadBtn;




