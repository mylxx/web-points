import React, { useState } from 'react';
import { Upload, Button, Modal, message } from 'antd';
import { UploadProps, UploadFile } from 'antd/es/upload';

const UploadBtn: React.FC = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewSrc, setPreviewSrc] = useState('');
  const [fileList, setFileList] = useState<any[]>([]);

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
    setPreviewVisible(true);

    // 添加到fileList中以便后续处理（如果需要的话）  
    const newFileList = [...fileList, { ...file, preview }];
    setFileList(newFileList);

    // 阻止自动上传  
    return false;
  };

  const handlePreviewClose = () => {
    // 清理预览链接  
    if (previewSrc) {
      URL.revokeObjectURL(previewSrc);
    }
    setPreviewVisible(false);
    // 如果需要，可以在这里重置fileList  
  };

  const handleUpload = () => {
    // 这里应该添加将文件上传到服务器的逻辑  
    // ...  
    message.success('文件上传成功!');
    handlePreviewClose(); // 关闭预览并清理  
  };

  const uploadProps: UploadProps = {
    name: 'file',
    listType: 'picture-card',
    className: 'avatar-uploader',
    showUploadList: false, // 不显示默认的上传列表  
    beforeUpload: handleBeforeUpload,
    fileList,
    onRemove: (file: UploadFile) => {
      // 当从fileList中移除文件时，可以清理预览链接（如果需要的话）  
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
      const newFileList = fileList.filter(f => f.uid !== file.uid);
      setFileList(newFileList);
    },
  };

  return (
    <>
      <Upload {...uploadProps}>
        <div>
          <div className="ant-upload-text">点击或拖拽文件到此区域上传</div>
        </div>
      </Upload>
      <Modal
        open={previewVisible}
        title="预览图片"
        footer={null}
        onCancel={handlePreviewClose}
      >
        <img src={previewSrc} alt="preview" style={{ width: '100%', maxHeight: '500px' }} />
        <div style={{ textAlign: 'right', marginTop: 16 }}>
          <Button onClick={handlePreviewClose} style={{ marginRight: 8 }}>
            重新选择
          </Button>
          <Button type="primary" onClick={handleUpload}>
            上传
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UploadBtn;




