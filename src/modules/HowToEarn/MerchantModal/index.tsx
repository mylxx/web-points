'use client';

import { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import { Form, Divider, ConfigProvider, Select } from 'antd';
import { Upload, message, Button } from 'antd';
import { UploadProps } from 'antd/es/upload';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import SVGWrapper from '@/components/SVGWrapper';
import { goLogin } from '@/apis';
import CloseIcon from '@/assets/images/common/CloseIcon.svg';
import RoundedLogo from '@/assets/images/howToEarn/RoundedLogo.svg';
// import useTranslations from '@/hooks/useTranslations';
import { RESPONSE_CODE } from '@/enums/request';

import './index.scss';

const { Item } = Form;
const { Option } = Select;
interface Country {
  id: string;
  name: string;
  cities: City[];
}

interface City {
  id: string;
  name: string;
}

const initialCountries: Country[] = [
  {
    id: 'c1',
    name: 'City 1',
    cities: [
      { id: 'co1', name: 'County 1-1' },
      { id: 'co2', name: 'County 1-2' },
    ],
  },
  {
    id: 'c2',
    name: 'City 2',
    cities: [
      { id: 'co3', name: 'County 2-1' },
      { id: 'co4', name: 'County 2-2' },
    ],
  },
];
export default forwardRef<MODAL.ModalActions, any>(
  function MerchantModal(props, ref) {
    const { showUploadModal } = props;
    const [open, setOpen] = useState(false);
    const [cuntryList, setCountryList] = useState<any[]>([]);
    // const { t } = useTranslations();
    const [formIns] = Form.useForm();
    const [isSkip, setIsSkip] = useState(0);
    useEffect(() => {
      goLogin({ name: 'test' })
        .then((res) => {
          const { code } = res;
          if (code === RESPONSE_CODE.SUCCESS) {
            // setUserInfo(res.data);
            setCountryList(initialCountries);
          }
        })
        .catch(() => {
          setCountryList(initialCountries);
        })
        .finally(() => setCountryList(initialCountries));
    });
    const showModal = () => {
      setOpen(true);
    };

    const hideModal = () => {
      setOpen(false);
    };

    useImperativeHandle(ref, () => ({
      showModal,
      hideModal,
    }));

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
      // 获取表单信息
      formIns.validateFields().then((formInfo: any) => {
        showUploadModal(preview, file, isSkip, formInfo);
      });
      return false;
    };
    // 上传配置
    const uploadProps: UploadProps = {
      name: 'file',
      listType: 'text',
      className: 'merchant-bill-uploader',
      showUploadList: false,
      beforeUpload: handleBeforeUpload,
    };

    return (
      <Modal
        open={open}
        centered
        onCancel={hideModal}
        width={400}
        closable={false}
        footer={null}
        destroyOnClose={true}
      >
        <div>
          <div className="flex justify-center items-center gap-[6px] mb-[20px]">
            <div className="text-titleText text-[16px] font-500">
              Get an Extra 100 Points
            </div>
            <SVGWrapper className="w-[22px] h-[22px]">
              <RoundedLogo />
            </SVGWrapper>
          </div>
          {/* 内容 */}
          <div className="flex flex-col justify-center bg-backGround rounded-[16px] px-[24px] pb-[12px]">
            <div className="flex justify-between items-center mb-[20px] gap-[6px] py-[20px] border-b-[#454549] border-b-[1px] border-b-solid ">
              <div className="text-titleText text-[18px] font-500">
                Fill in merchant information
              </div>
              <SVGWrapper
                className="w-[32px] h-[32px] cursor-pointer"
                onClick={() => hideModal()}
              >
                <CloseIcon />
              </SVGWrapper>
            </div>
            <ConfigProvider
              theme={{
                components: {
                  Form: { itemMarginBottom: 20 },
                },
              }}
            >
              <Form
                form={formIns}
                layout="vertical"
                size="large"
                clearOnDestroy
                preserve={false}
                requiredMark={(labelNode) => {
                  return (
                    <span className="text-titleText text-[18px] font-500">
                      {labelNode}
                    </span>
                  );
                }}
              >
                {/*  */}
                <Item name="merId" label="Enter merchant PID">
                  <Input
                    placeholder="Please enter the merchant PID"
                    className="h-[54px] rounded-[12px]"
                  />
                </Item>
                <Divider plain className="border-[#424242]">
                  OR
                </Divider>
                <div className="text-titleText text-[18px] font-500 pt-[4px]">
                  Fill in merchant information
                </div>
                {/* 国家 */}
                <Item
                  name="country"
                  label={
                    <span className="text-titleText text-[12px]">Country</span>
                  }
                >
                  <Select
                    showSearch
                    allowClear
                    filterOption={(input, option) =>
                      ((option?.value as string) ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    placeholder="Please select a country"
                    className="h-[54px]"
                  >
                    {cuntryList?.map((city) => (
                      <Option key={city.id} value={city.id}>
                        {city.name}
                      </Option>
                    ))}
                  </Select>
                </Item>
                {/* 城市input */}
                <Item
                  name="City"
                  label={
                    <span className="text-titleText text-[12px]">City</span>
                  }
                >
                  <Input
                    placeholder="Please enter a city"
                    className="h-[54px] rounded-[12px]"
                  />
                </Item>
                {/* 商户名 */}
                <Item
                  name="storeName"
                  label={
                    <span className="text-titleText text-[12px]">
                      Store Name
                    </span>
                  }
                >
                  <Input
                    placeholder="Please enter merchant name"
                    className="h-[54px] rounded-[12px]"
                  />
                </Item>
                {/* 底部按钮，点击上传图片，并标识是否传商户信息 */}
                <>
                  <Upload {...uploadProps} className="w-full">
                    <Button
                      className="w-full mt-[12px] h-[54px]"
                      type="primary"
                      size="large"
                      onClick={() => setIsSkip(1)}
                    >
                      Continue
                    </Button>
                  </Upload>

                  <Upload {...uploadProps} className="w-full">
                    <Button
                      className="w-full mt-[10px] h-[54px] mb-[18px] text-[#8A8B8D] bg-transparent border-[#8A8B8D]"
                      size="large"
                      onClick={() => setIsSkip(2)}
                    >
                      Skip
                    </Button>
                  </Upload>
                </>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </Modal>
    );
  },
);
