import { message as AntdMessage, MessageArgsProps } from 'antd';
import SVGWrapper from '@/components/SVGWrapper';
import ToastSuccessIcon from '@/assets/images/common/ToastSuccessIcon.svg';

const _message = AntdMessage;

const originSuccess = AntdMessage.success;

const success: typeof AntdMessage.success = (content, duration, onClose) => {
  const config: MessageArgsProps = {
    icon: (
      <SVGWrapper className="w-[16px] h-[16px] mr-8">
        <ToastSuccessIcon />
      </SVGWrapper>
    ),
    content: '',
    duration: duration as number,
    onClose,
  };
  if (typeof content === 'string') {
    config.content = content;
  } else {
    Object.assign(config, content);
  }
  return originSuccess(config);
};

_message.success = success;

export default _message;
