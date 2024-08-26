import { headers } from 'next/headers';

const zhHansDescription = 'zhHansDescription';

const zhHantDescription = 'zhHansDescription';

const enDescription = 'zhHansDescription';

export default {
  'zh-HK': {
    title: '',
    description: zhHantDescription,
  },
  'zh-CN': {
    title: '',
    description: zhHansDescription,
  },
  en: {
    title: '',
    description: enDescription,
  },
  'dev-lang': {
    title: '',
    description: enDescription,
  },
};

export type TypeGenerateMetadata = {
  params: { locale?: I18N.LocaleType };
};

export const downloadMeta = {
  'zh-HK': {
    title: '',
    description: '',
  },
  'zh-CN': {
    title: '',
    description: '',
  },
  en: {
    title: '',
    description: '',
  },
  'dev-lang': {
    title: '',
    description: enDescription,
  },
};

export const otcMeta = {
  'zh-HK': {
    title: '',
    description: zhHantDescription,
  },
  'zh-CN': {
    title: '',
    description: zhHansDescription,
  },
  en: {
    title: '',
    description: enDescription,
  },
  'dev-lang': {
    title: '',
    description: enDescription,
  },
};

export const getCanonical = () => {
  const isTest = process.env.NEXT_PUBLIC_NODE_ENV === 'test';
  const domain = isTest ? '.testcom' : '.com';
  const headersList = headers();
  const referer = headersList.get('cus-url') ?? '';
  const url = referer.replace('localhost:3003', domain);
  return url;
};
