'use client';

import { Button } from 'antd';
// import useTranslations from '@/hooks/useTranslations';
export default function HowToEarn() {
    // const { t } = useTranslations();
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
            >
                Upload
            </Button>
        </div>
    );
}
