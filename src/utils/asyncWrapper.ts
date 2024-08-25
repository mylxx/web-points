import { RESPONSE_CODE } from '@/enums/request';

export const asyncWrapper = async <T>(
  request: Promise<T>,
): Promise<[undefined, T] | [T, undefined]> => {
  try {
    const result = await request;
    return [undefined, result];
  } catch (error) {
    return [error, undefined] as [T, undefined];
  }
};

export const requestWrapper = async <T extends API.ResponseBody<any>>(
  request: Promise<T>,
): Promise<[undefined, T] | [T, undefined]> => {
  const asyncResult = await asyncWrapper(request);
  const [, result] = asyncResult;
  if (result && result.code !== RESPONSE_CODE.SUCCESS) {
    return [result, undefined];
  }
  return asyncResult;
};
