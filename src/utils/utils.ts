import type { TypeCoinKey, TypeGetMarketsAllCoinItem } from '@/apis/markets';

// export { default as compose } from './compose';
import compose from './compose';
export { compose };

export const DEVELOPMENT = 'development';
export const PRODUCTION = 'production';
export const TEST = 'test';

export const getEnv = () => {
  return process.env.NEXT_PUBLIC_NODE_ENV;
};

export const isDev = getEnv() === DEVELOPMENT;

export const isProd = getEnv() === PRODUCTION;

export const isClient = () => typeof window !== 'undefined';

export const isServer = () => typeof window === 'undefined';

export const commonReg = {
  url: /^(http(s)?:\/\/)\w+\S+(\.\S+)+$/,
  email: /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,
};

// 分组
type TypeGroupBy<T> = (list: T[], key: keyof T) => Record<TypeCoinKey, T[]>;
export const groupBy: TypeGroupBy<TypeGetMarketsAllCoinItem> = (
  list: any[],
  key: string,
) => {
  return (list ?? []).reduce((result, item) => {
    (result[item[key]] = result[item[key]] || []).push(item);
    return result;
  }, Object.create(null));
};

// 如果算出来是整数， 默认携带两个0
export const removeZero = (val: string) => {
  const [integer, decimal = ''] = val.split('.');

  const reduceDecimal = decimal.replace(/0+$/, '').replace(/\.$/, '');
  return decimal ? `${integer}.${reduceDecimal || '00'}` : `${integer}.00`;
};

// 移除多余的0， number 不需要执行此方法，
export const removeExcessZero = (value: string | number) => {
  const val = typeof value === 'number' ? value : removeZero(value);
  return val;
};

// 千分位追加逗号
export const thousandth = (val: string | number) => {
  const [integer, decimal = ''] = val.toString().split('.');

  const integerVal = integer.toString().replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
  return decimal ? `${integerVal}.${decimal}` : integerVal;
};

// 保留x位小数 -> 默认保留2位小数
// 不进行四舍五入
export const getValByDecimalPlaces = (
  val: string | number,
  decimalPlaces: number = 2,
) => {
  const [integer, decimal = ''] = val.toString().split('.');

  const decimalVal = decimal.slice(0, decimalPlaces).padEnd(decimalPlaces, '0');
  return `${integer}.${decimalVal}`;
};

// 千分位追加逗号 & 移除多余的 0
export const getValByThousandthRemoveExcessZero = (
  val: string | number,
): string => {
  return compose(thousandth, removeExcessZero)(val);
};

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    const copy: any[] = [];
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return copy as any as T;
  }
  const copy: { [key: string]: any } = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key]);
    }
  }
  return copy as T;
}
