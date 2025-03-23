/**
 * YYYYMMDD形式の日付を、2進数→逆にする→10進数としたとき、元の値と同じになるものは？
 */

import { dayjs } from '~/lib/dayjs.js';

const begin = performance.now();

const FROM = dayjs('1964-10-10');
const END = dayjs('2020-07-24');

for (let i = FROM; i.isSameOrBefore(END); i = i.add(1, 'day')) {
  const base = Number.parseInt(i.format('YYYYMMDD'));
  const b02 = base.toString(2).split('').reverse().join('');
  const transformed = Number.parseInt(b02, 2);

  if (base === transformed) {
    console.log(`a07. = ${i.format('YYYY-MM-DD')}`);
  }
}

const finish = performance.now();
console.log(`${finish - begin}ms`);
