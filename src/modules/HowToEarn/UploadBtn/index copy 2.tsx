import React, { useState } from 'react';
import { Upload, Button, Image } from 'antd';
import Modal from '@/components/Modal'
import { UploadProps, UploadFile } from 'antd/es/upload';

interface ImageUploadProps {
  // 这里可以添加你的props定义，如果需要的话  
}

const UploadBtn: React.FC<ImageUploadProps> = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [currentFile, setCurrentFile] = useState('');

  // 处理文件选择前的逻辑  
  const handleBeforeUpload = (file: any) => {
    // 显示预览弹窗并设置当前文件  

    const previewUrl = URL.createObjectURL(file);
    // 你可以将previewUrl存储到状态中，以便在Modal或其他组件中使用  
    setPreviewVisible(true);
    setCurrentFile(previewUrl);
    setPreviewVisible(true);
    console.log('Uploading file:', file);

    // 阻止自动上传  
    return false;
  };

  // 处理预览弹窗的关闭  
  const handlePreviewClose = () => {
    setPreviewVisible(false);
    // 如果需要，可以清空当前文件（这里根据需求决定是否清空）  
    // setCurrentFile(null);  
  };

  // 处理用户确认上传  
  const handleConfirmUpload = () => {
    // 在这里添加你的上传逻辑，比如调用API上传文件  
    console.log('Uploading file:', currentFile);
    // 假设上传成功，你可以更新fileList或进行其他处理  
    // 注意：这里只是模拟，实际情况下你应该在上传成功后更新fileList  

    // 关闭预览弹窗  
    setPreviewVisible(false);
    // 如果需要，可以清空当前文件（取决于你的需求）  
    // setCurrentFile(null);  
  };

  // 处理文件列表变化  
  const handleChange: UploadProps['onChange'] = info => {
    // 注意：这里我们只处理添加文件的情况，如果需要处理删除等其他情况，请相应修改  
    if (info.file.status === 'done') {
      // 如果文件已经上传（虽然在这个例子中我们阻止了自动上传），你可能需要更新fileList  
      // 但在这个场景下，我们更关心的是即将上传的文件，所以这里不做处理  
      // 实际情况中，你可能需要将上传成功的文件添加到fileList中，并移除currentFile  
    } else {
      // 更新fileList以显示已选择的文件（尽管我们在这里主要关注预览）  
      // 但为了完整性，我们还是更新了fileList  
      const newFileList = [...fileList, info.file];
      setFileList(newFileList);
    }
  };

  return (
    <>
      <Upload
        name="file"
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
        beforeUpload={handleBeforeUpload}
      // 注意：这里没有设置action，因为我们手动处理了上传逻辑  
      >
        {fileList.length >= 1 ? null : (
          <div style={{ height: 220, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed #d9d9d9', borderRadius: 8 }}>
            <div style={{ color: '#ccc', fontSize: 14, margin: 0 }}>
              Click or drag file to this area to upload
            </div>
          </div>
        )}
      </Upload>
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={handlePreviewClose}
      >
        {currentFile && (
          <div style={{ textAlign: 'center' }}>
            {/* 注意：这里假设currentFile.url或currentFile.thumbUrl是可用的，实际情况中你可能需要处理这些属性 */}
            <Image width={400} src={currentFile} />
            <div style={{ marginTop: 20 }}>
              <Button onClick={handlePreviewClose} type="link">
                重新选择
              </Button>
              <Button onClick={handleConfirmUpload} type="primary" style={{ marginLeft: 8 }}>
                确认上传
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UploadBtn;


