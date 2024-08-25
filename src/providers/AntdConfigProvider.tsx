'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from '@ant-design/cssinjs';
import { ConfigProvider, ThemeConfig } from 'antd';
import themeVariables from '@/config/themeVariables';
import { SITE_THEME } from '@/enums/site';
import { useTheme } from '@/hooks/useTheme';

const getThemeConfig = (theme: Global.Theme): ThemeConfig => {
  const primaryColor = themeVariables[theme]['--B00'];
  const line = themeVariables[theme]['--line'];
  const blockPrimary = themeVariables[theme]['--block-primary'];
  const r00 = themeVariables[theme]['--R00'];
  const descriptionText = themeVariables[theme]['--description-text'];
  const titleText = themeVariables[theme]['--title-text'];
  const frontGround = themeVariables[theme]['--front-ground'];
  const baiJamjureeRegular =
    themeVariables.global['--font-bai-jamjuree-regular'];
  const baiJamjureeSemibold =
    themeVariables.global['--font-bai-jamjuree-semibold'];
  const DarkGround = themeVariables[theme]['--dark-ground'];
  const AlwaysWhite = themeVariables.global['--always-white'];
  const DialogBG = themeVariables[theme]['--dialog'];
  return {
    token: {
      colorBgElevated: frontGround,
      colorPrimary: primaryColor,
      colorBgContainerDisabled: line,
      fontFamily: baiJamjureeRegular,
      colorTextPlaceholder: descriptionText,
      colorBgContainer: frontGround,
      colorText: titleText,
      colorTextDisabled: descriptionText,
    },
    components: {
      Spin: {
        colorPrimary: primaryColor,
      },
      Button: {
        primaryShadow: 'unset',
        boxShadow: 'unset',
        borderRadius: 80,
        borderRadiusLG: 80,
        controlHeightLG: 48,
        controlHeight: 40,
        defaultColor: primaryColor,
        fontFamily: baiJamjureeSemibold,
        colorTextDisabled: descriptionText,
        colorBgContainerDisabled: line,
        algorithm: true,
      },
      Menu: {
        itemBg: DialogBG,
        darkItemHoverColor: DialogBG,
        darkItemSelectedBg: DialogBG,
        darkSubMenuItemBg: DialogBG,
      },
      Popover: {
        colorBgElevated: DialogBG,
        motionDurationMid: '0.1s',
      },
      Input: {
        paddingBlockLG: 14,
        paddingInlineLG: 16,
        inputFontSizeLG: 14,
        lineHeightLG: 1.42,
      },
      Select: {
        paddingXXS: 0,
        singleItemHeightLG: 48,
        paddingSM: 16,
        fontSizeLG: 14,
        optionHeight: 48,
        optionActiveBg: blockPrimary,
        optionSelectedBg: blockPrimary,
        optionPadding: '12px 16px',
      },
      Form: {
        colorError: r00,
      },
      Divider: {
        colorSplit: line,
      },
      Message: {
        contentBg: DarkGround,
        borderRadiusLG: 12,
        colorText: AlwaysWhite,
        contentPadding: 16,
      },
    },
  };
};

export const AntdConfigProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  // TODO 获取缓存的theme
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(
    getThemeConfig(SITE_THEME.DARK),
  );
  const { theme } = useTheme();
  useEffect(() => {
    setThemeConfig(getThemeConfig(theme));
  }, [theme]);

  return (
    <StyleProvider layer transformers={[legacyLogicalPropertiesTransformer]}>
      <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
    </StyleProvider>
  );
};
