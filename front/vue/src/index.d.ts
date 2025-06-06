// https://zenn.dev/wintyo/articles/0f0e7e86a3361f
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...never[]];

type Paths<T, D extends number = 10> = D extends never
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends string | number ? K | Join<K, Paths<T[K], Prev[D]>> : never;
      }[keyof T]
    : '';
