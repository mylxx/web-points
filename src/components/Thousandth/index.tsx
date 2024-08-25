import { thousandth } from '@/utils/utils';
import useThousandthRemoveExcessZero from '@/hooks/useThousandthRemoveExcessZero';

type TypePorps = {
  value: string | number | undefined;
  isRemoveExcessZero?: boolean;
  decimalPlaces?: number;
};

// 默认保留2位小数 且 不进行四舍五入 且 移除多余的 0
const Thousandth = ({
  value,
  decimalPlaces = 2,
  isRemoveExcessZero = true,
}: TypePorps) => {
  const thousandthRemoveExcessZeroByDecimalPlaces =
    useThousandthRemoveExcessZero(value, decimalPlaces);

  if (!value) {
    return '--';
  }

  const result = isRemoveExcessZero
    ? thousandthRemoveExcessZeroByDecimalPlaces
    : thousandth(value);
  return isRemoveExcessZero ? result : thousandth(value);
};

export default Thousandth;
