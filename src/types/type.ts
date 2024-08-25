/* eslint-disable */
export type Remove<S extends string> = S extends `${infer L}${infer R}`
  ? R
  : '';
/* eslint-enable */

export type ObjectNormalizePaths<
  S,
  R extends string = '',
  K = keyof S,
> = K extends keyof S
  ? K extends string
    ? S[K] extends Record<string, any>
      ? ObjectNormalizePaths<S[K], `${R}.${K}`>
      : Remove<`${R}.${K}`>
    : ''
  : '';

export type GetListType<L extends readonly string[]> = L[number];
