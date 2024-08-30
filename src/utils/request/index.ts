import axios, { CreateAxiosDefaults } from 'axios';
import { setRecoil } from 'recoil-nexus';
import { getHTTPHeaderLocale } from '@/utils/i18nUtils';
import { message } from '@/utils/messageNexus';
import { removeLocalToken } from '@/utils/tokenUtils';
import { isDev, isServer } from '@/utils/utils';
import { RESPONSE_CODE } from '@/enums/request';
import { loginState } from '@/store';

const createRequest = (config: CreateAxiosDefaults = {}) => {
  const { ...restConfig } = config;
  const ins = axios.create(Object.assign({}, restConfig));
  // 需要 check 不同 env 域名是不是一致
  // 开发环境走代理， 非开发环境直接调用域名
  if (!isDev) ins.defaults.baseURL = process.env.NEXT_PUBLIC_REQUEST_DOMAIN;
  ins.interceptors.request.use((config) => {
    if (isServer()) {
      throw new Error(JSON.stringify({ code: RESPONSE_CODE.REQUEST_IGNORE }));
    }
    config.headers.set('X-lang', getHTTPHeaderLocale());
    return config;
  });

  ins.interceptors.response.use(
    (response) => {
      const { data } = response;
      return Promise.resolve(data);
    },
    (error) => {
      console.error('axios error:', error);
      // 本地开发处理 404
      if (isDev && error.response?.status == RESPONSE_CODE.NOT_FOUND) {
        return {
          code: RESPONSE_CODE.NOT_FOUND,
        };
      }
      // 处理401 token过期
      if (error.response?.status == RESPONSE_CODE.TOKEN_EXPIRED) {
        removeLocalToken();
        setRecoil(loginState, false);
        message.info('401');
        return {
          code: RESPONSE_CODE.TOKEN_EXPIRED,
        };
      }
      message.error(error.message);
      return Promise.reject(error);
    },
  );
  return ins;
};

export default {
  get<R, T = Record<string, any>>(
    url: string,
    params?: T,
    config?: CreateAxiosDefaults,
  ) {
    // console.log('get request', url, params);
    return createRequest(config).get<unknown, API.ResponseBody<R>>(url, {
      params,
    });
  },
  post<R, T = Record<string, string>>(
    url: string,
    params?: T,
    config?: CreateAxiosDefaults,
  ) {
    // console.log('post request', url, params);
    return createRequest(config).post<never, API.ResponseBody<R>>(url, params);
  },
  put<R, T = Record<string, string>>(
    url: string,
    params?: T,
    config?: CreateAxiosDefaults,
  ) {
    // console.log('put request', url, params);
    return createRequest(config).put<never, API.ResponseBody<R>>(url, params);
  },
  delete<R>(url: string, config?: CreateAxiosDefaults) {
    // console.log('delete request', url);
    return createRequest(config).delete<never, API.ResponseBody<R>>(url);
  },
};
