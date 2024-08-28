import React from 'react';
import { Button, message, Upload } from 'antd';
import { goLogin } from '@/apis';
// import type { UploadProps } from 'antd';

import './index.scss';
const UploadBtn: React.FC<{ formIns: any }> = ({ formIns }) => {
  const props = (isSkip: boolean) => {
    return {
      name: 'file',
      action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
      headers: {
        authorization: 'authorization-text',
      },
      customRequest() {
        console.log(111);
      },
      async beforeUpload() {
        if (!isSkip) {
          console.log(3333);
          const data = await formIns.validateFields();
          console.log('data', data);
          goLogin({ name: 'nnnn' })
            .then((res) => {
              console.log(res);
            })
            .catch((e) => console.log(e));
        }
      },
      onChange(info: any) {
        console.log(4444);
        console.log('info', info);
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
  };

  const propsContinue = props(false);
  const propsSkip = props(true);

  return (
    <>
      <Upload {...propsContinue} className="w-full">
        <Button
          className="w-full mt-[12px] h-[54px]"
          type="primary"
          size="large"
        >
          Continue
        </Button>
      </Upload>

      <Upload {...propsSkip} className="w-full">
        <Button
          className="w-full mt-[10px] h-[54px] mb-[18px] text-[#8A8B8D] bg-transparent border-[#8A8B8D]"
          size="large"
        >
          Skip
        </Button>
      </Upload>
    </>
  );
};

export default UploadBtn;
