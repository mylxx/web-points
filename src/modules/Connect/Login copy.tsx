'use client'

import React, { useState } from 'react';
import { Form, Input, Button, message, Space } from 'antd';
// import useTranslations from '@/hooks/useTranslations';
import { commonReg } from '@/utils/utils';

const { Item } = Form;
interface FormValues {
    email: string;
    code: string;
}
const Login: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);
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
        console.log('Received values from form: ', values);
        message.success('登录成功！');
    };

    return (
        <div style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
            <Form
                form={form}
                name="login"
                layout="vertical"
                size="large"
                clearOnDestroy
                preserve={false}
                requiredMark={(labelNode) => {
                    return (
                        <span className="text-titleText font-bai text-[14px] leading-[18px]">
                            {labelNode}: *
                        </span>
                    );
                }}
                onFinish={handleFinish}
            >
                <Item
                    name="email"
                    label="contact_placeholder"
                    rules={[
                        {
                            required: true,
                            message: "contact_information.blank_tip",
                        },
                        {
                            pattern: commonReg.email,
                            message: "rules.format",
                        },
                    ]}
                    validateTrigger="onBlur"
                >
                    <Input
                        placeholder="contact_placeholder"
                        maxLength={200}
                    />
                </Item>
                <Item
                    shouldUpdate={(prevValues, currentValues) =>
                        prevValues.email !== currentValues.email
                    }
                >
                    {() => (
                        <Space className='flex items-center'>
                            <Item
                                className='flex-1'
                                name="code"
                                rules={[{ required: true, message: '请输入验证码!' }]}
                            >
                                <Input />
                            </Item>
                            <Item className='shrink-0'>
                                <Button
                                    type="primary"
                                    size='small'
                                    onClick={handleSendCode}
                                    disabled={!form.getFieldValue('email')}
                                    loading={loading}
                                >
                                    {countdown > 0 ? `${countdown}秒后重发` : '发送验证码'}
                                </Button>
                            </Item>
                        </Space>
                    )}
                </Item>
                <Item>
                    <Button type="primary" htmlType="submit" block>
                        登录
                    </Button>
                </Item>
            </Form>
        </div>
    );
};

export default Login;