'use client';

import { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import { Form, Divider, ConfigProvider, Select } from 'antd';
import { Upload, message, Button } from 'antd';
import { UploadProps } from 'antd/es/upload';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import SVGWrapper from '@/components/SVGWrapper';
import { getCountryList } from '@/apis';
import { RESPONSE_CODE } from '@/enums/request';
import CloseIcon from '@/assets/images/common/CloseIcon.svg';
import RoundedLogo from '@/assets/images/howToEarn/RoundedLogo.svg';
import useTranslations from '@/hooks/useTranslations';

import './index.scss';

const { Item } = Form;
const { Option } = Select;

export default forwardRef<MODAL.ModalActions, any>(
  function MerchantModal(props, ref) {
    const { showUploadModal } = props;
    const [open, setOpen] = useState(false);
    const [cuntryList, setCountryList] = useState<any[]>([{
      "country_language_code": "zh",
      "country_name": "中国"
    }, {
      "country_language_code": "jap",
      "country_name": "小日子"
    }]);
    const { t } = useTranslations();
    const [formIns] = Form.useForm();
    const [isSkip, setIsSkip] = useState(0);

    useEffect(() => {
      // 获取国家
      getCountryList()
        .then((res) => {
          const { code, data } = res;
          if (code === RESPONSE_CODE.SUCCESS) {
            setCountryList(data);
            // TODO: 修改
            setCountryList([{
              "country_language_code": "zh",
              "country_name": "中国"
            }
            ]);

          }
        })
        .catch(() => {
          setCountryList([]);
        })
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
        message.error(t('upload_size'));
        return false;
      }

      const isImageOrPdf =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/bmp' ||
        file.type === 'application/pdf';
      if (!isImageOrPdf) {
        message.error(t('upload_type'));
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
              {t('merchant_extra_points')}
            </div>
            <SVGWrapper className="w-[22px] h-[22px]">
              <RoundedLogo />
            </SVGWrapper>
          </div>
          {/* 内容 */}
          <div className="flex flex-col justify-center bg-backGround rounded-[16px] px-[24px] pb-[12px]">
            <div className="flex justify-between items-center mb-[20px] gap-[6px] py-[20px] border-b-[#454549] border-b-[1px] border-b-solid ">
              <div className="text-titleText text-[18px] font-500">
                {t('merchant_fill_info')}
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
                <Item name="merchant_pid" label={t('merchant_enter_pid')}>
                  <Input
                    placeholder={t('merchant_enter_pid_prompt')}
                    className="h-[54px] rounded-[12px]"
                  />
                </Item>
                <Divider plain className="border-[#424242]">
                  {t('merchant_or')}
                </Divider>
                <div className="text-titleText text-[18px] font-500 pt-[4px]">
                  {t('merchant_fill_info')}
                </div>
                {/* 国家 */}
                <Item
                  name="country_language_code"
                  label={
                    <span className="text-titleText text-[12px]">{t('merchant_country')}</span>
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
                    placeholder={t('merchant_enter_country')}
                    className="h-[54px]"
                  >
                    {cuntryList?.map((item) => (
                      <Option key={item.country_language_code} value={item.country_language_code}>
                        {item.country_name}
                      </Option>
                    ))}
                  </Select>
                </Item>
                {/* 城市input */}
                <Item
                  name="city"
                  label={
                    <span className="text-titleText text-[12px]">{t('merchant_city')}</span>
                  }
                >
                  <Input
                    placeholder={t('merchant_enter_city')}
                    className="h-[54px] rounded-[12px]"
                  />
                </Item>
                {/* 商户名 */}
                <Item
                  name="store_name"
                  label={
                    <span className="text-titleText text-[12px]">
                      {t('merchant_name')}
                    </span>
                  }
                >
                  <Input
                    placeholder={t('merchant_enter_name')}
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
                      {t('merchant_country')}
                    </Button>
                  </Upload>

                  <Upload {...uploadProps} className="w-full">
                    <Button
                      className="w-full mt-[10px] h-[54px] mb-[18px] text-[#8A8B8D] bg-transparent border-[#8A8B8D]"
                      size="large"
                      onClick={() => setIsSkip(2)}
                    >
                      {t('merchant_skip')}
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
