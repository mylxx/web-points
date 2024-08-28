'use client';

import { useImperativeHandle, forwardRef, useState } from 'react';
import { UploadProps } from 'antd/es/upload';
import { Button, message, Upload } from 'antd';
import Modal from '@/components/Modal';
import SVGWrapper from '@/components/SVGWrapper';
import CloseIcon from '@/assets/images/common/CloseIcon.svg';
import MarkIcon from '@/assets/images/common/MarkIcon.svg';
import useTranslations from '@/hooks/useTranslations';

export default forwardRef<MODAL.ModalActions, any>(
    function UploadModal(props, ref) {
        const [open, setOpen] = useState(false);
        const { t } = useTranslations();
        const { previewSrc, fileInfo, isSkip, handleBeforeUpload } = props
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
        const uploadProps: UploadProps = {
            name: 'file',
            listType: 'text',
            className: 'avatar-uploader',
            showUploadList: false,
            beforeUpload: handleBeforeUpload,
        };

        const goUpload = () => {
            console.log('previewSrc', previewSrc)
            console.log('isSkip', isSkip)
            console.log('fileInfo', fileInfo)
        }
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
                            Upload Pictures
                        </div>
                        <SVGWrapper
                            className="w-[32px] h-[32px] cursor-pointer"
                            onClick={() => hideModal()}
                        >
                            <CloseIcon />
                        </SVGWrapper>
                    </div>
                    {/* 内容 */}
                    <div className="width-full h-[300px] border-[1px] border-solid border-transparent rounded-[16px]">
                        <img src={previewSrc} className='w-full h-full object-contain' alt="preview" />
                    </div>
                    <div className='flex items-start gap-[4px] w-[300px] mx-auto mt-[24px] mb-[30px]'>
                        <SVGWrapper
                            className="w-[16px] h-[16px] shrink-0"
                        >
                            <MarkIcon />
                        </SVGWrapper>
                        <div className='flex-1 text-[14px] leading-[16px] text-titleText'>
                            Please ensure the image is clear and includes the payment address and amount.
                            What can not be accepted: human / natural view etc.
                        </div>
                    </div>
                    <div className='flex gap-[10px] pc:mb-[16px] mobile:mb-[30px]'>
                        <Upload {...uploadProps} className="w-full">
                            <Button
                                className="w-[50%] h-[54px]  text-[#8A8B8D] bg-transparent border-[#8A8B8D]"
                                size="large"
                            >
                                Reselect
                            </Button>
                        </Upload>
                        <Button
                            className="w-[50%] h-[54px]"
                            type="primary"
                            size="large"
                            onClick={goUpload}
                        >
                            Confirm upload
                        </Button>
                    </div>
                </div>
            </Modal>
        );
    },
);



