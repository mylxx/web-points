'use client';

import { PropsWithChildren } from 'react';
import msg from '@/components/Message';

type MessageType = typeof msg;

const messageNexus: Pick<
  MessageType,
  'error' | 'info' | 'success' | 'warning' | 'loading' | 'destroy' | 'open'
> = {
  error: msg.error,
  info: msg.info,
  success: msg.success,
  warning: msg.warning,
  loading: msg.loading,
  destroy: msg.destroy,
  open: msg.open,
};

export default function MessageNexus(props: PropsWithChildren) {
  const [messageApi, contextHolder] = msg.useMessage();

  messageNexus.error = messageApi.error;
  messageNexus.info = messageApi.info;
  messageNexus.success = messageApi.success;
  messageNexus.warning = messageApi.warning;
  messageNexus.loading = messageApi.loading;
  messageNexus.destroy = messageApi.destroy;
  messageNexus.open = messageApi.open;

  return (
    <>
      {contextHolder}
      {props.children}
    </>
  );
}

const error: MessageType['error'] = (...args) => {
  return messageNexus.error(...args);
};

const info: MessageType['info'] = (...args) => {
  return messageNexus.info(...args);
};

const success: MessageType['success'] = (...args) => {
  return messageNexus.success(...args);
};
const warning: MessageType['warning'] = (...args) => {
  return messageNexus.warning(...args);
};
const loading: MessageType['loading'] = (...args) => {
  return messageNexus.loading(...args);
};
const destroy: MessageType['destroy'] = (...args) => {
  return messageNexus.destroy(...args);
};
const open: MessageType['open'] = (...args) => {
  return messageNexus.open(...args);
};

const message = {
  ...msg,
  error,
  info,
  success,
  warning,
  loading,
  destroy,
  open,
};

export { message };
