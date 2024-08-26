'use client';

import {
  GlobalOutlined,
  MoonOutlined,
  BarChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { FloatButton } from 'antd';
import { isLocalProxy } from '@/utils/envChecker';
import { I18N_LOCALES } from '@/enums/i18n';
import useChangeLocale from '@/hooks/useChangeLocale';
import { useTheme } from '@/hooks/useTheme';

const { Group } = FloatButton;
const localeMap: Record<I18N.LocaleType, string> = {
  en: '英',
  'zh-Hans': '简',
  'zh-Hant': '繁',
  'dev-lang': 'key',
};
export default function DevTools() {
  const { changeLocale, currentLocale } = useChangeLocale();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Group
        trigger="hover"
        style={{ right: 80, bottom: 20 }}
        icon={<GlobalOutlined />}
      >
        {I18N_LOCALES.map((locale) => (
          <FloatButton
            key={locale}
            type={locale === currentLocale ? 'primary' : undefined}
            icon={<span className="text-[14px]">{localeMap[locale]}</span>}
            onClick={() => changeLocale(locale)}
          />
        ))}
      </Group>
      <Group
        trigger="hover"
        style={{ right: 20, bottom: 20 }}
        icon={<SettingOutlined />}
      >
        {/* TODO 查看store状态 */}
        <FloatButton icon={<BarChartOutlined />} />
        <FloatButton
          type={theme === 'dark' ? 'primary' : undefined}
          icon={<MoonOutlined />}
          onClick={() => toggleTheme()}
        />
      </Group>
    </>
  );
}
