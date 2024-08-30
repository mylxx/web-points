'use client';

import React, { useEffect, useState } from 'react';
import { Form, Button, message } from 'antd';
import { useSetRecoilState } from 'recoil';
import Input from '@/components/Input';
import useTranslations from '@/hooks/useTranslations';
import { commonReg } from '@/utils/utils';
import { goLogin, goTest } from '@/apis';
import { RESPONSE_CODE } from '@/enums/request';
import { loginState } from '@/store';

const { Item } = Form;
interface FormValues {
  email: string;
  code: string;
}
const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [sendLoading, setSendLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [buttonEnable, setButtonEnable] = useState(false);
  const setIsLogin = useSetRecoilState(loginState);
  const { t } = useTranslations();

  useEffect(() => {
    // 测试
    goTest().then(res => {
      console.log(res)
    })


  }, [])


  const handleSendCode = async () => {
    const emailValue = form.getFieldValue('email');
    if (!emailValue) {
      message.error('请先输入邮箱地址！');
      return;
    }
    // 模拟发送验证码的异步操作
    setSendLoading(true);
    setCountdown(30); // 假设倒计时30秒
    form.resetFields(['code']); // 重置验证码字段
    const intervalId = window.setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(intervalId);
          setSendLoading(false);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
    message.success('验证码发送成功，请查收邮箱！');
    // 这里应调用后端API发送验证码
  };

  const handleFinish = async (values: FormValues) => {
    // 这里应调用后端API进行登录
    setSubmitLoading(true);
    goLogin({ ...values })
      .then((res) => {
        const { code } = res;
        if (code === RESPONSE_CODE.SUCCESS) {
          // setUserInfo(res.data);
          setIsLogin(true);
        }
      })
      .catch(() => {
        setIsLogin(false);
      })
      .finally(() => setSubmitLoading(false));
    console.log('Received values from form: ', values);
    message.success('登录成功！');
  };

  const onFieldsChange = (allSettled: boolean) => {
    setButtonEnable(allSettled);
  };
  return (
    <div className="w-full max-w-[460px] bg-backGround rounded-[16px] pc:px-[24px] mobile:px-[12px]  pb-[8px]">
      <div className="text-titleText text-[18px] font-500 py-[18px] border-b-[#454549] border-b-[1px] border-b-solid mb-[24px]">
        Login
      </div>
      <Form
        form={form}
        name="login"
        layout="vertical"
        size="large"
        clearOnDestroy
        preserve={false}
        requiredMark={(labelNode) => {
          return (
            <span className="text-titleText font-bai text-[12px]">
              {labelNode}
            </span>
          );
        }}
        onFieldsChange={(changedFields, allFields) => {
          onFieldsChange(allFields.every((field) => Boolean(field.value)));
        }}
        onFinish={handleFinish}
      >
        <Item
          className="!mb-[32px]"
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: t('common.blank_tip'),
            },
            {
              pattern: commonReg.email,
              message: t('common.rules.format'),
            },
          ]}
          validateTrigger="onBlur"
        >
          <Input
            placeholder="contact_placeholder"
            maxLength={200}
            className="h-[54px] rounded-[12px]"
          />
        </Item>
        <Item
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.email !== currentValues.email
          }
          className="!mb-[8px]"
        >
          {() => (
            <span className="block w-full relative">
              <Item
                className="w-full"
                name="code"
                label="Verify Code"
                rules={[{ required: true, message: '请输入验证码!' }]}
              >
                <Input className="h-[54px] rounded-[12px]" />
              </Item>
              <Item className="absolute right-[10px] top-[38px]">
                <Button
                  type="primary"
                  size="small"
                  onClick={handleSendCode}
                  disabled={!form.getFieldValue('email') || sendLoading}
                  // loading={loading}
                  className="!h-[28px] !px-[16px] !rounded-[6px]"
                >
                  {countdown > 0 ? `${countdown}s` : 'send'}
                </Button>
              </Item>
            </span>
          )}
        </Item>
        <Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={!buttonEnable}
            loading={submitLoading}
          >
            登录
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default Login;
