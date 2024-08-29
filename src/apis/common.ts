import request from '@/utils/request';
import { getLocalToken } from '@/utils/tokenUtils';
import API from './api';

export const logOut = () => {
  return request.post(API.LOG_OUT, {
    authToken: getLocalToken(),
  });
};
