'use client';

import { useEffect, useMemo, useState } from 'react';
import { QRCode as AntQRCode, QRCodeProps as AntQRCodeProps } from 'antd';
import { useTheme } from '@/hooks/useTheme';

export interface QRCodeProps
  extends Omit<AntQRCodeProps, 'bgColor' | 'fgColor'> {
  bgColor?: string;
  fallbackBgColor?: string;
  fgColor?: string;
  fallbackFgColor?: string;
}

export default function QRCode(props: QRCodeProps) {
  const { fgColor: propsFGColor, bgColor: propsBGColor, ...rest } = props;

  const [fgColor, setFgColor] = useState<string>();
  const [bgColor, setBgColor] = useState<string>();
  const { theme } = useTheme();

  const status = useMemo(() => {
    if (!propsFGColor && !propsBGColor) {
      return 'active';
    }
    if (fgColor || bgColor) {
      return 'active';
    }
    return 'loading';
  }, [fgColor, bgColor, propsFGColor, propsBGColor]);

  useEffect(() => {
    const bodyStyle = getComputedStyle(document.body);
    if (propsFGColor) {
      const colorFromCssVar = bodyStyle.getPropertyValue(propsFGColor);
      if (colorFromCssVar) {
        setFgColor(colorFromCssVar);
      }
    }
    if (propsBGColor) {
      const colorFromCssVar = bodyStyle.getPropertyValue(propsBGColor);
      if (colorFromCssVar) {
        setBgColor(colorFromCssVar);
      }
    }
  }, [theme, propsFGColor, propsBGColor]);

  return (
    <AntQRCode
      {...rest}
      status={status}
      type="svg"
      color={fgColor}
      bgColor={bgColor}
      bordered={false}
    ></AntQRCode>
  );
}
