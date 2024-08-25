'use client';

import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';
import './index.scss';
import { useScreenChecker } from '@/hooks/useScreenChecker';

export interface ModalProps extends AntModalProps {}

export default function Modal(props: ModalProps) {
  const { isPhone } = useScreenChecker();
  return (
    <AntModal {...props} width={isPhone ? '100vw' : props.width}></AntModal>
  );
}
