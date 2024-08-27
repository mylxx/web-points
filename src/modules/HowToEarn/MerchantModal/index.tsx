'use client';

import { useImperativeHandle, forwardRef, useState } from 'react';
import { Form, Divider, ConfigProvider, Select } from 'antd';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import SVGWrapper from '@/components/SVGWrapper';
import UploadBtn from '../UploadBtn';
import CloseIcon from '@/assets/images/common/CloseIcon.svg';
import RoundedLogo from '@/assets/images/howToEarn/RoundedLogo.svg';
import useTranslations from '@/hooks/useTranslations';
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
export default forwardRef<MODAL.ModalActions>(
  function MerchantModal(props, ref) {
    const [open, setOpen] = useState(false);
    const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
    const { t } = useTranslations();
    const [formIns] = Form.useForm();
    const showModal = () => {
      setOpen(true);
    };

    const hideModal = () => {
      setOpen(false);
      setCurrentCountry(null);
    };

    useImperativeHandle(ref, () => ({
      showModal,
      hideModal,
    }));

    const handleCountryChange = (value: string) => {
      const city = initialCountries.find((c) => c.id === value) || null;
      setCurrentCountry(city);
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
                <Item name="merId" label="Enter merchant PID">
                  <Input
                    placeholder="contact_placeholder"
                    className="h-[54px] rounded-[12px]"
                  />
                </Item>
                <Divider plain className="border-[#424242]">
                  Or
                </Divider>
                <div className="text-titleText text-[18px] font-500 pt-[4px]">
                  Fill in merchant information
                </div>

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
                    onChange={handleCountryChange}
                    className="h-[54px]"
                  >
                    {initialCountries.map((city) => (
                      <Option key={city.id} value={city.id}>
                        {city.name}
                      </Option>
                    ))}
                  </Select>
                </Item>
                <Item
                  name="City"
                  label={
                    <span className="text-titleText text-[12px]">City</span>
                  }
                >
                  <Select
                    showSearch
                    allowClear
                    filterOption={(input, option) => {
                      return ((option?.value as string) ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }}
                    placeholder="Please select a city"
                    disabled={!currentCountry}
                    className="h-[54px]"
                  >
                    {currentCountry?.cities.map((county) => (
                      <Option key={county.id} value={county.name}>
                        {county.name}
                      </Option>
                    ))}
                  </Select>
                </Item>
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
                <UploadBtn formIns={formIns} />
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </Modal>
    );
  },
);
