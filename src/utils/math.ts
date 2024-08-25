import { Decimal } from 'decimal.js';

// 两数相乘
export function multiply(num1: string, num2: string) {
  return Decimal.mul(num1, num2).toString();
}

//  两数相除
export function divide(dividend: string, divisor: string) {
  if (divisor === '0' || !divisor) {
    return '0';
  }
  return Decimal.div(dividend, divisor).toString();
}

// 保留小数位--舍入模式 x=3.456 -> x.toFixed(2)=3.45
export function toFixed(strNum: string, decimalPlaces: number) {
  return new Decimal(strNum).toFixed(decimalPlaces, Decimal.ROUND_DOWN);
}

// 保留有效小数位
export function toRetainFixed(strNum: string, decimalPlaces: number) {
  const [preStr, endStr] = strNum.split('.');
  if (!endStr || !decimalPlaces) return preStr;
  const startIndex = endStr.split('').findIndex((n) => n !== '0');
  if (startIndex !== -1) {
    return preStr + '.' + endStr.slice(0, startIndex + decimalPlaces);
  }
  return preStr;
}
