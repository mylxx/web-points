'use client';

import React, { useState } from 'react';
import { Form, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import Input from '@/components/Input';
import { setLocalToken } from '@/utils/tokenUtils';
import { commonReg } from '@/utils/utils';
import { goLogin, sendEmail } from '@/apis';
import { RESPONSE_CODE } from '@/enums/request';
import useTranslations from '@/hooks/useTranslations';
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
  const { push } = useRouter();
  const handleSendCode = async () => {
    const emailValue = form.getFieldValue('email');
    if (!emailValue) {
      return;
    }
    setSendLoading(true);
    setCountdown(60); // 假设倒计时30秒
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
    // 这里应调用后端API发送验证码
    const data = {
      open_id: emailValue, //邮箱
      send_type: 'LOGIN', //发送类型
    };
    sendEmail(data)
      .then((res) => {
        const { code, msg } = res;
        if (code === RESPONSE_CODE.SUCCESS) {
          message.success(t('login_code_sent'));
          return;
        }
        msg && message.error(msg);
      })
      .catch((res) => {});
  };
  // 提交登录
  const handleFinish = async (values: FormValues) => {
    // 这里应调用后端API进行登录
    if (!values.code) {
      message.success(t('login_code_tip'));
      return;
    }
    setSubmitLoading(true);
    const data = {
      open_id: values.email.trim(),
      verification_code: values.code.trim(),
      account_type: 'email',
    };
    goLogin({ ...values })
      .then((res) => {
        const { code, data, msg } = res;
        if (code === RESPONSE_CODE.SUCCESS) {
          setLocalToken(data.token);
          setIsLogin(true);
          push('/');
          return;
        }
        msg && message.error(msg);
      })
      .catch(() => {
        setIsLogin(false);
      })
      .finally(() => setSubmitLoading(false));
  };

  const onFieldsChange = (allSettled: boolean) => {
    setButtonEnable(allSettled);
  };
  return (
    <div className="w-full max-w-[460px] bg-backGround rounded-[16px] pc:px-[24px] mobile:px-[12px]  pb-[8px]">
      <div className="text-titleText text-[18px] font-500 py-[18px] border-b-[#454549] border-b-[1px] border-b-solid mb-[24px]">
        {t('common.header.login')}
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
          onFieldsChange(
            allFields.every(
              (field) => !field.errors?.length && Boolean(field.value),
            ),
          );
        }}
        onFinish={handleFinish}
      >
        <Item
          className="!mb-[32px]"
          name="email"
          label={t('login_email')}
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
          // validateTrigger="onBlur"
        >
          <Input
            placeholder={t('login_email')}
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
                label={t('login_verification_code')}
                rules={[{ required: true, message: t('login_code_tip') }]}
              >
                <Input
                  className="h-[54px] rounded-[12px]"
                  placeholder={t('login_verification_code')}
                />
              </Item>
              <Item className="absolute right-[10px] top-[38px]">
                <Button
                  type="primary"
                  size="small"
                  onClick={handleSendCode}
                  disabled={
                    !commonReg.email.test(form.getFieldValue('email')) ||
                    sendLoading
                  }
                  // loading={loading}
                  className="!h-[28px] !px-[16px] !rounded-[6px]"
                >
                  {countdown > 0 ? `${countdown}s` : t('login_send')}
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
            {t('common.header.login')}
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default Login;
