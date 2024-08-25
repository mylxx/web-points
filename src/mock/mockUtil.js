import Mock from 'mockjs';
import { RESPONSE_TYPE } from '../enums/request';

export const successResult = (data, type = RESPONSE_TYPE.WITH_CODE) => {
  if (type === RESPONSE_TYPE.WITH_STATUS) {
    return {
      status: 'OK',
      data: Mock.mock(data),
    };
  }
  if (type === RESPONSE_TYPE.NO_STATUS) {
    return {
      ...Mock.mock(data),
    };
  }
  if (type === RESPONSE_TYPE.WITH_RESULT_CODE) {
    return {
      resultCode: 'OK',
      ...Mock.mock(data),
    };
  }
  return {
    code: '200',
    data: Mock.mock(data),
  };
};
