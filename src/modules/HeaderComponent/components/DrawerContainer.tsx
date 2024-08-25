'use client';

import React, {
  useState,
  PropsWithChildren,
  ReactElement,
  useEffect,
} from 'react';
import { Drawer } from 'antd';
import SVGWrapper from '@/components/SVGWrapper';
import CloseIcon from '../assets/CloseIcon.svg';
import Logo from '../assets/Logo.svg';
import { useScreenChecker } from '@/hooks/useScreenChecker';
import type { DrawerStyles } from 'antd/es/drawer/DrawerPanel';

const DrawerContainer = (
  props: PropsWithChildren & {
    content: ReactElement;
  },
) => {
  const [open, setOpen] = useState(false);
  const { isPhone, isPC } = useScreenChecker();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isPC) {
      onClose();
    }
  }, [isPC]);

  const drawerStyles: DrawerStyles = {
    header: {
      borderBottom: '0 none',
      position: 'sticky',
      width: '100%',
      boxSizing: 'border-box',
    },
    body: {
      padding: '24px 12px',
      background: 'var(--dialog)',
    },
  };

  return (
    <>
      <div onClick={showDrawer} className="pc:hidden common-hover-transition">
        {props.children}
      </div>
      <Drawer
        styles={drawerStyles}
        width={isPhone ? '100vw' : '375px'}
        title={
          <div className="flex justify-between items-center">
            <SVGWrapper className="w-[44px]">
              <Logo />
            </SVGWrapper>
            <SVGWrapper className="w-[12px] cursor-pointer">
              <span onClick={onClose} className="cursor-pointer">
                <CloseIcon />
              </span>
            </SVGWrapper>
          </div>
        }
        placement={'right'}
        closable={false}
        onClose={onClose}
        open={open}
      >
        {props.content &&
          React.cloneElement(props.content, {
            onClose,
          })}
      </Drawer>
    </>
  );
};

export default DrawerContainer;
