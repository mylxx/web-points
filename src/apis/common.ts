import request from '@/utils/request';
import { getLocalToken } from '@/utils/tokenUtils';
import API from './api';

export interface CountryListItem {
  country: string;
  shortCode: string;
  code: string;
  phoneCode: string;
  logo: string;
}

export type CountryListResponse = Array<CountryListItem>;

export const getCountryList = () => {
  return request.get<CountryListResponse>(API.COUNTRY_LIST);
};

export const logOut = () => {
  return request.post(API.LOG_OUT, {
    authToken: getLocalToken(),
  });
};
