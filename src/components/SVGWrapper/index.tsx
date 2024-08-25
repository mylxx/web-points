'use client';

import { PropsWithChildren } from 'react';
import cls from 'classnames';
import wrapperStyle from './index.module.scss';

interface SVGWrapperProps extends Global.PropsWithBasic {
  onClick?: () => void;
}

export default function SVGWrapper(props: PropsWithChildren<SVGWrapperProps>) {
  const { style, className, onClick, children } = props;

  return (
    <span
      className={cls(wrapperStyle['svg-wrapper'], className)}
      style={style}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
