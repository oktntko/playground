/**
 * フィボナッチ数列のうち、各桁の数値を足した数で割り切れる数を
 * 以下の例に続けて小さい方から５つ求めよ
 */

{
  // # number の場合
  const begin = performance.now();

  const n: number[][] = [];

  for (let a = 1, b = 1, c: number; n.length < 11; a = b, b = c) {
    c = a + b;

    const x = c
      .toString()
      .split('')
      .map(Number)
      .reduce((x, y) => x + y);

    if (c % x === 0) {
      n.push([c, x, c / x]);
    }
  }

  console.table(n);

  const finish = performance.now();
  console.log(`${finish - begin}ms`);

  // ★ 11個目
  // 679,891,637,638,612,200 / 84 = 8,093,948,067,126,336
  //   => Number.MAX_SAFE_INTEGER を超えるので正しい数値になっていない
}

{
  // # bigint の場合
  const begin = performance.now();

  const n: bigint[][] = [];

  for (let a = 1n, b = 1n, c: bigint; n.length < 11; a = b, b = c) {
    c = a + b;

    const x = c
      .toString()
      .split('')
      .map(BigInt)
      .reduce((x, y) => x + y);

    if (c % x === 0n) {
      n.push([c, x, c / x]);
    }
  }

  console.table(n);

  const finish = performance.now();
  console.log(`${finish - begin}ms`);

  // ★ 11個目
  // 160,500,643,816,367,088 / 72 = 2,229,175,608,560,654
}
