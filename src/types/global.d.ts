import React from 'react';
import { LocaleTypeUnio } from '@/enums/i18n';
import { RESPONSE_CODE } from '@/enums/request';
import { SITE_THEME } from '@/enums/site';

type InitFunction = (props: { locale: I18N.LocaleType }) => void;

declare module '*.svg' {
  const component: React.FC<React.SVGProps<SVGSVGElement>>;

  export default component;
}

declare global {
  interface Window {
    dataLayer?: any[];
  }

  namespace MODAL {
    interface ModalActions {
      showModal: () => void;
      hideModal: () => void;
    }
  }

  namespace I18N {
    export type LocaleType = LocaleTypeUnio;
    export type RemoteLocalType = 'en_US' | 'zh_CN' | 'zh_HK';
  }

  namespace Global {
    type Theme = SITE_THEME;
    interface LocaleChangeFunction {
      (locale: I18N.LocaleType, useReplace?: boolean): void;
    }

    interface PropsWithBasic {
      className?: string;
      style?: React.CSSProperties;
    }
  }

  namespace API {
    interface ResponseBody<T> {
      code: RESPONSE_CODE;
      data: T;
      message?: string;
      params?: Array<string | number>;
    }
  }

  interface Window {
    asyncFnLoader: {
      header: Record<I18N.LocaleType, InitFunction>;
      footer: Record<I18N.LocaleType, InitFunction>;
    };
    headerInit: InitFunction;
    footerInit: InitFunction;
    control: any;
    webkit: any;
  }
}
