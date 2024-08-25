import request from '@/utils/request';
import API from './api';
import { RESPONSE_TYPE } from '@/enums/request';

export const getUserAccount = () => {
  return request.get<any>(API.USER_ACCOUNT, undefined, {
    handleResponseType: RESPONSE_TYPE.WITH_STATUS,
  });
};
