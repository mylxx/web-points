interface LanguageMenuType {
  label: string;
  key: I18N.LocaleType;
  icon?: string;
  path?: string;
}

export const LanguageMenu: LanguageMenuType[] = [
  {
    label: 'English',
    key: 'en',
    icon: '',
    path: '',
  },
  {
    label: '中文(简体)',
    key: 'zh-Hans',
    icon: '',
    path: '',
  },
  {
    label: '中文(繁體)',
    key: 'zh-Hant',
    icon: '',
    path: '',
  },
];
