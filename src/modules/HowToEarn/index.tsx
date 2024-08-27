'use client';
import { useRef } from 'react'
import { Button } from 'antd';
import MerchantModal from './MerchantModal';
// import useTranslations from '@/hooks/useTranslations';
export default function HowToEarn() {
    // const { t } = useTranslations();
    const merchantModalRef = useRef<MODAL.ModalActions>(null);
    const showMerchantModal = () => {
        merchantModalRef.current?.showModal();
    }
    return (
        <div className="w-full">
            <div className="px-[20px] text-titleText pc:text-[24px] pc:mb-[24px] mobile:text-[20px] mobile:mb-[20px]">
                how to learn
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
            <MerchantModal ref={merchantModalRef} />
        </div>
    );
}
