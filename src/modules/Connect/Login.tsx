'use client';

import React, { useState } from 'react';
import { Form, Button, message } from 'antd';
import { useSetRecoilState } from 'recoil';
import Input from '@/components/Input';
// import useTranslations from '@/hooks/useTranslations';
import { commonReg } from '@/utils/utils';
import { goLogin } from '@/apis';
import { RESPONSE_CODE } from '@/enums/request';
import { loginState } from '@/store';

const { Item } = Form;
interface FormValues {
  email: string;
  code: string;
}
const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [buttonEnable, setButtonEnable] = useState(false);

  const setIsLogin = useSetRecoilState(loginState);

  // const { t } = useTranslations();

  const handleSendCode = async () => {
    const emailValue = form.getFieldValue('email');
    if (!emailValue) {
      message.error('请先输入邮箱地址！');
      return;
    }
    // 模拟发送验证码的异步操作
    setLoading(true);
    setCountdown(30); // 假设倒计时30秒
    form.resetFields(['code']); // 重置验证码字段
    const intervalId = window.setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(intervalId);
          setLoading(false);
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
      });
    console.log('Received values from form: ', values);
    message.success('登录成功！');
  };

  const onFieldsChange = (allSettled: boolean) => {
    setButtonEnable(allSettled);
  };
  return (
    <div className="w-full max-w-[460px] bg-backGround rounded-[16px] px-[24px]">
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
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'contact_information.blank_tip',
            },
            {
              pattern: commonReg.email,
              message: 'rules.format',
            },
          ]}
          validateTrigger="onBlur"
        >
          <Input placeholder="contact_placeholder" maxLength={200} />
        </Item>
        <Item
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.email !== currentValues.email
          }
          className="mt-[32px]"
        >
          {() => (
            <div className="w-full flex items-end justify-between gap-[16px]">
              <Item
                className="flex-1 w-full"
                name="code"
                label="Verify Code"
                rules={[{ required: true, message: '请输入验证码!' }]}
              >
                <Input />
              </Item>
              <Item className="shrink-0 mt-[16px]">
                <Button
                  type="primary"
                  size="small"
                  onClick={handleSendCode}
                  disabled={!form.getFieldValue('email')}
                  loading={loading}
                >
                  {countdown > 0 ? `${countdown}秒后重发` : '发送验证码'}
                </Button>
              </Item>
            </div>
          )}
        </Item>
        <Item className="mt-[32px]">
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={!buttonEnable}
          >
            登录
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default Login;
