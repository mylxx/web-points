export enum RESPONSE_CODE {
  SUCCESS = '200',
  ERROR = '-1',

  TOKEN_EXPIRED = '401',
  NOT_FOUND = '404',
  ERROR_REQUEST = '400',

  ERR_CANCELED = 'ERR_CANCELED',
  REQUEST_IGNORE = 'REQUEST_IGNORE',
}

export enum RESPONSE_TYPE {
  // 返回结构体 { code, data, message }
  WITH_CODE = 'WITH_CODE',
  // 返回结构体 { status, data }
  WITH_STATUS = 'WITH_STATUS',
  // 返回结构体 { resultCode, ...others }
  WITH_RESULT_CODE = 'WITH_RESULT_CODE',
  // 返回结构体无状态
  NO_STATUS = 'NO_STATUS',
}
