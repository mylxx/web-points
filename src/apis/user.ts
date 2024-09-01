import request from '@/utils/request';
import API from './api';
export const goLogin = (data: any) => {
  return request.post<any>(API.LOG_IN, data);
};
export const sendEmail = (data: any) => {
  return request.post<any>(API.EmailSend, data);
};
export const getUserAccount = (data?: any) => {
  return request.get<any>(API.USER_ACCOUNT, data);
};
export const logOut = () => {
  return request.post(API.LOG_OUT);
};
export const getPointsList = (data: any) => {
  return request.get<any>(API.PointsList, data);
};
// s3 token
export const getAwsToken = () => {
  return request.get<any>(API.AwsToken);
};
// 保存商户信息
export const saveInvoice = (data: any) => {
  return request.post<any>(API.SaveInvoice, data);
};
// 国家
export const getCountryList = () => {
  return request.get<any>(API.CountryList);
};
