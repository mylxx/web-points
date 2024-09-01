'use client';

import { useImperativeHandle, forwardRef, useState, useMemo } from 'react';
import { FilePptOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { UploadProps } from 'antd/es/upload';
import AsyncImage from '@/components/AsyncImage';
import Modal from '@/components/Modal';
import SVGWrapper from '@/components/SVGWrapper';
import ResultCom from './ResultCom';
import CloseIcon from '@/assets/images/common/CloseIcon.svg';
import MarkIcon from '@/assets/images/common/MarkIcon.svg';
import './index.scss';
import ScanImg from '@/assets/images/howToEarn/ScanImg.png';
import useTranslations from '@/hooks/useTranslations';
import { saveInvoice, getAwsToken } from '@/apis';
import { RESPONSE_CODE } from '@/enums/request';

export default forwardRef<MODAL.ModalActions, any>(
  function UploadModal(props, ref) {
    const [open, setOpen] = useState(false);
    const [scanLoading, setScanLoading] = useState(false); // 扫描
    const [result, setResult] = useState<object>({}); // 扫码结果
    const { t } = useTranslations();
    const {
      isSkip, // 2跳过
      formInfo,
      previewSrc,
      fileInfo,
      resetPreviewSrc,
      resetFileInfo,
    } = props;
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

    // reSelected 重新上传相关-start
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
      // 去父组件重置图片信息
      resetPreviewSrc(preview);
      resetFileInfo(file);
      return false;
    };
    const uploadProps: UploadProps = {
      name: 'file',
      listType: 'text',
      className: 'reset-merchant-bill-uploader',
      showUploadList: false,
      beforeUpload: handleBeforeUpload,
    };
    // reSelected 重新上传相关-end

    // Confirm upload
    const goUpload = () => {
      setScanLoading(true);
      getAwsToken().then((res) => {
        if (res.code === RESPONSE_CODE.SUCCESS) {
          const data = {
            ...fileInfo,
            invoice_path: res.data.path
          }
          if (isSkip == 1) {
            saveInvoice(data).then((res) => {
              if (res.code === RESPONSE_CODE.SUCCESS) {
              }
            })
          }
          setScanLoading(false);
        }
      })
      setResult({
        mypoints: 344444,
        conterPatry: 5555555,
      });
      console.log('previewSrc', previewSrc);
      console.log('isSkip', isSkip);
      console.log('fileInfo', fileInfo);
      console.log('formInfo', formInfo);
    };
    const moduleTitle = useMemo(() => {
      if (Object.keys(result).length) {
        return t('upload_result')
      }
      if (scanLoading) {
        return t('upload_analyzing')
      }
      return t('upload_pictures')

    }, [scanLoading, result, t])

    return (
      <Modal
        open={open}
        centered
        onCancel={hideModal}
        width={700}
        closable={false}
        footer={null}
        destroyOnClose={true}
      >
        <div className="flex flex-col justify-center bg-backGround rounded-[16px] px-[24px] pb-[12px]">
          <div className="flex justify-between items-center mb-[20px] gap-[6px] py-[20px] border-b-[#454549] border-b-[1px] border-b-solid ">
            <div className="text-titleText text-[18px] font-500">
              {moduleTitle}
            </div>
            <SVGWrapper
              className="w-[32px] h-[32px] cursor-pointer"
              onClick={() => hideModal()}
            >
              <CloseIcon />
            </SVGWrapper>
          </div>
          {/* 内容 */}
          {!Object.keys(result).length ? (
            // 结果
            <ResultCom result={result} />
          ) : (
            <>
              <div className="width-full relative h-[300px] border-[1px] border-solid border-transparent rounded-[16px]">
                {/* scan图片展示 */}
                {scanLoading && (
                  <AsyncImage
                    src={ScanImg}
                    alt="scan"
                    className="w-full h-full absolute top-0 bottom-0 right-0 left-0"
                  />
                )}
                {/* 图片回显 */}
                {fileInfo?.type === 'application/pdf' ? (
                  <FilePptOutlined
                    color="#fff"
                    className="text-[100px] block mx-auto mt-[100px]"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewSrc}
                    className="w-full h-full object-contain"
                    alt="preview"
                  />
                )}
              </div>
              <div className="flex items-start gap-[4px] w-[300px] mx-auto mt-[24px] mb-[30px]">
                <SVGWrapper className="w-[16px] h-[16px] shrink-0">
                  <MarkIcon />
                </SVGWrapper>
                <div className="flex-1 text-[14px] leading-[16px] text-titleText">
                  {t('upload_ensure_clear')}
                  <br />
                  {t('upload_not_accepted')}
                </div>
              </div>
              <div className="flex gap-[10px] pc:mb-[16px] mobile:mb-[30px] mobile:flex-col">
                <Upload
                  {...uploadProps}
                  className="w-[50%] mobile:w-full mobile:order-2"
                >
                  <Button
                    className="w-full h-[54px]  text-[#8A8B8D] bg-transparent border-[#8A8B8D]"
                    size="large"
                  >
                    {t('upload_reselect')}
                  </Button>
                </Upload>
                <Button
                  className="w-[50%] h-[54px] mobile:w-full mobile:order-1"
                  type="primary"
                  size="large"
                  onClick={goUpload}
                >
                  {t('upload_upload')}
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    );
  },
);
