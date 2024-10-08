/* eslint-disable */
type Func<T extends any[], R> = (...a: T) => R;

export default function compose(): <R>(a: R) => R;

export default function compose<F extends Function>(f: F): F;

export default function compose<A, T extends any[], R>(
  f1: (a: A) => R,
  f2: Func<T, A>,
): Func<T, R>;

export default function compose<A, B, T extends any[], R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func<T, A>,
): Func<T, R>;

export default function compose<A, B, C, T extends any[], R>(
  f1: (c: C) => R,
  f2: (b: B) => C,
  f3: (a: A) => B,
  f4: Func<T, A>,
): Func<T, R>;

export default function compose<R>(
  f1: (a: any) => R,
  ...funcs: Function[]
): (...args: any[]) => R;

export default function compose<R>(...funcs: Function[]): (...args: any[]) => R;

export default function compose(...funcs: Function[]) {
  return funcs.reduce(
    (a, b) =>
      (...args: any) =>
        a(b(...args)),
  );
}

/* eslint-enable */
