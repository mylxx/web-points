'use client';

import { useImperativeHandle, forwardRef, useState, useMemo } from 'react';
import { Button, Form, Divider, ConfigProvider, Select } from 'antd';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import { useScreenChecker } from '@/hooks/useScreenChecker';
import useTranslations from '@/hooks/useTranslations';
import SVGWrapper from '@/components/SVGWrapper';
import CloseIcon from '@/assets/images/common/CloseIcon.svg';
import RoundedLogo from '@/assets/images/howToEarn/RoundedLogo.svg';
const { Item } = Form;
const { Option } = Select;
interface City {
    id: string;
    name: string;
    counties: County[];
}

interface County {
    id: string;
    name: string;
}

const initialCities: City[] = [
    {
        id: 'city1',
        name: 'City 1',
        counties: [
            { id: 'county1', name: 'County 1-1' },
            { id: 'county2', name: 'County 1-2' },
        ],
    },
    {
        id: 'city2',
        name: 'City 2',
        counties: [
            { id: 'county3', name: 'County 2-1' },
            { id: 'county4', name: 'County 2-2' },
        ],
    },
];
export default forwardRef<MODAL.ModalActions>(
    function MerchantModal(props, ref) {
        const [open, setOpen] = useState(false);
        const [currentCity, setCurrentCity] = useState<City | null>(null);

        const { t } = useTranslations();
        const { isPhone } = useScreenChecker();
        const [formIns] = Form.useForm();


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

        const handleCityChange = (value: string) => {
            const city = initialCities.find(c => c.id === value) || null;
            setCurrentCity(city);
        };
        return (
            <Modal
                open={open}
                centered
                onCancel={hideModal}
                width={416}
                closable={false}
                footer={null}
            >
                <div>
                    <div className="flex justify-center items-center h-[46px] gap-[16px]">
                        <div className="text-titleText text-[16px] font-600">
                            titles
                        </div>
                        <SVGWrapper className="w-[16px] h-[16px]">
                            <RoundedLogo />
                        </SVGWrapper>
                    </div>
                    {/* 内容 */}
                    <div className="flex flex-col justify-center gap-[16px] bg-backGround rounded-[12px] px-[12px] pb-[12px]">
                        <div className='flex justify-between items-center gap-[6px] py-[12px] border-b-[#454549] border-b-[1px] border-b-solid '>
                            <div className="text-titleText text-[16px]">
                                弹窗标题
                            </div>
                            <SVGWrapper className="w-[16px] h-[16px]">
                                <CloseIcon />
                            </SVGWrapper>
                        </div>


                        <ConfigProvider
                            theme={{
                                components: {
                                    Form: { itemMarginBottom: 26 },
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
                                        <span className="text-titleText font-bai text-[14px] leading-[18px]">
                                            {labelNode}
                                        </span>
                                    );
                                }}

                            >
                                <Item
                                    name="merId"
                                    label="merchant id"
                                >
                                    <Input
                                        placeholder="contact_placeholder"
                                        className="h-[54px] rounded-[12px]"
                                    />
                                </Item>
                                <Divider plain className='border-[#dadada]'>Or</Divider>
                                <div className="text-titleText text-[16px]">
                                    fill in
                                </div>

                                <Item
                                    name="city"
                                    label="City"
                                    rules={[{ required: true, message: 'Please select a city!' }]}
                                >
                                    <Select placeholder="Select a city" onChange={handleCityChange}>
                                        {initialCities.map(city => (
                                            <Option key={city.id} value={city.id}>
                                                {city.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Item>
                                <Item
                                    name="county"
                                    label="County"
                                    rules={[{ required: true, message: 'Please select a county!' }]}
                                >
                                    <Select placeholder="Select a county" disabled={!currentCity}>
                                        {currentCity?.counties.map(county => (
                                            <Option key={county.id} value={county.id}>
                                                {county.name}
                                            </Option>
                                        ))}
                                    </Select>

                                </Item>

                                <Button
                                    block={isPhone}
                                    type="primary"
                                    size="middle"

                                    onClick={hideModal}
                                >
                                    submit
                                </Button>
                            </Form>
                        </ConfigProvider>
                    </div>

                </div>

            </Modal>
        );
    },
);
