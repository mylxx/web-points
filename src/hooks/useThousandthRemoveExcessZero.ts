import {
  thousandth,
  getValByDecimalPlaces,
  compose,
  removeExcessZero,
} from '@/utils/utils';

const composeFn = compose(getValByDecimalPlaces, thousandth, removeExcessZero);

// 默认保留2位小数 且 不进行四舍五入 且 移除多余的 0
const useThousandthRemoveExcessZero = (
  val: string | number | undefined,
  decimalPlaces: number = 2,
) => {
  if (!val) {
    return '';
  }

  if (decimalPlaces === 2) {
    return composeFn(val);
  } else {
    const wrapperGetValByDecimalPlaces = (parameter: string | number) => {
      return getValByDecimalPlaces(parameter, decimalPlaces);
    };

    // // 高阶函数 动态组合 保留 x 位小数 -> 传递到 自定义 hooks
    const composeFn = compose(
      wrapperGetValByDecimalPlaces,
      thousandth,
      removeExcessZero,
    );
    return composeFn(val);
  }
};
export default useThousandthRemoveExcessZero;
