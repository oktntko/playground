/**
 *      1
 *     1 1
 *    1 0 1
 *   1 1 1 1
 *  1 0 0 0 1
 * 1 1 0 0 1 1
 */

import { R } from '~/lib/remeda';

const begin = performance.now();

let arr = [true];

for (let count = 0; count < 2014; ) {
  arr = R.range(0, arr.length + 1).map((_, i) => !!arr[i - 1] !== !!arr[i]);
  count += arr.filter((x) => x === false).length;
}

console.log(arr.length);

const finish = performance.now();
console.log(`${finish - begin}ms`);
