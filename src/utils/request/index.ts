import axios, { CreateAxiosDefaults } from 'axios';
import { setRecoil } from 'recoil-nexus';
import { isLocalProxy } from '@/utils/envChecker';
import { getHTTPHeaderLocale } from '@/utils/i18nUtils';
import { remoteT, t } from '@/utils/IntlNexus';
import { message } from '@/utils/messageNexus';
import { getLocalToken, removeLocalToken } from '@/utils/tokenUtils';
import { isClient, isDev, isServer } from '@/utils/utils';
import { RESPONSE_CODE, RESPONSE_TYPE } from '@/enums/request';
import { HEADER_AUTH_TOKEN_KEY } from '@/enums/site';
import { loginState } from '@/store';

export interface Config extends CreateAxiosDefaults {
  handleResponseType?: RESPONSE_TYPE;
}


const createRequest = (config: Config = {}) => {
  const { handleResponseType = RESPONSE_TYPE.WITH_CODE, ...restConfig } =
    config;
  const ins = axios.create(Object.assign({}, restConfig));
  ins.interceptors.request.use((config) => {
    if (isServer()) {
      throw new Error(JSON.stringify({ code: RESPONSE_CODE.REQUEST_IGNORE }));
    }
    config.headers.set(HEADER_AUTH_TOKEN_KEY, 'Bearer ' + getLocalToken());
    config.headers.set('X-lang', getHTTPHeaderLocale());
    return config;
  });

  ins.interceptors.response.use(
    (response) => {
      const { data } = response;
      if (handleResponseType === RESPONSE_TYPE.WITH_CODE) {
        return Promise.resolve({ ...data, message: data.msg });
      } else if (handleResponseType === RESPONSE_TYPE.WITH_STATUS) {
        const { status, data: responseData } = data;
        if (status === 'OK') {
          return Promise.resolve({
            code: RESPONSE_CODE.SUCCESS,
            data: responseData,
          });
        }
        console.error(data);
        return Promise.resolve({
          code: RESPONSE_CODE.ERROR,
          message: 'request error',
        });
      } else if (handleResponseType === RESPONSE_TYPE.NO_STATUS) {
        return Promise.resolve({ code: RESPONSE_CODE.SUCCESS, data });
      } else if (handleResponseType === RESPONSE_TYPE.WITH_RESULT_CODE) {
        const { resultCode, ...rest } = data;
        if (resultCode === 'OK') {
          return Promise.resolve({
            code: RESPONSE_CODE.SUCCESS,
            data: rest,
          });
        }
        console.log(rest);
        return Promise.resolve({
          code: RESPONSE_CODE.ERROR,
          message: 'request error',
        });
      }
      return Promise.resolve(data);
    },
    (error) => {
      if (isServer()) {
        return Promise.resolve({
          code: RESPONSE_CODE.REQUEST_IGNORE,
        });
      }
      if (error.code !== RESPONSE_CODE.ERR_CANCELED) {
        // with code类型的响应
        if (handleResponseType === RESPONSE_TYPE.WITH_CODE) {
          const data = error.response?.data;
          const code = data?.code;
          const params = (data?.params || []) as Array<string | number>;
          // 这里对with code类型的响应做统一message提示处理
          if (code) {
            const errorMsg = remoteT(
              code,
              params.reduce(
                (total, param, index) => {
                  total[index] = param;
                  return total;
                },
                {} as Record<string, any>,
              ),
            );
            if (errorMsg !== code) {
              message.error(errorMsg);
            }
            return Promise.resolve({
              ...data,
              message: data.msg,
            });
          }
        }
        console.error('axios error:', error);
      }
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
        message.info(t('request.error.401'));
        return {
          code: RESPONSE_CODE.TOKEN_EXPIRED,
        };
      }
      if (error.code !== RESPONSE_CODE.ERR_CANCELED) {
        message.error(error.message);
      }
      return Promise.reject(error);
    },
  );
  return ins;
};

export default {
  get<R, T = Record<string, any>>(url: string, params?: T, config?: Config) {
    // console.log('get request', url, params);
    return createRequest(config).get<unknown, API.ResponseBody<R>>(url, {
      params,
    });
  },
  post<R, T = Record<string, string>>(
    url: string,
    params?: T,
    config?: Config,
  ) {
    // console.log('post request', url, params);
    return createRequest(config).post<never, API.ResponseBody<R>>(url, params);
  },
  put<R, T = Record<string, string>>(url: string, params?: T, config?: Config) {
    // console.log('put request', url, params);
    return createRequest(config).put<never, API.ResponseBody<R>>(url, params);
  },
  delete<R>(url: string, config?: Config) {
    // console.log('delete request', url);
    return createRequest(config).delete<never, API.ResponseBody<R>>(url);
  },
};
