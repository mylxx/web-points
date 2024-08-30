import request from '@/utils/request';
import API from './api';

export const getUserAccount = (data?: any) => {
  return request.get<any>(API.USER_ACCOUNT, data);
};
export const goLogin = (data: any) => {
  return request.post<any>(API.LOG_IN, data);
};

export const goTest = () => {
  return request.get<any>('/v1/pub/mix/headerMenu');
};
