/**
 * 10進数、8進数、2進数、すべてで回文数となる数値のうち、
 * 10進数の10以上で最小の数は？
 */

const begin = performance.now();

for (let i = 10; ; i++) {
  const b02 = i.toString(2);
  const o08 = i.toString(8);
  const d10 = i.toString(10);
  const x16 = i.toString(16);

  if (
    b02 === b02.split('').reverse().join('') &&
    o08 === o08.split('').reverse().join('') &&
    d10 === d10.split('').reverse().join('')
  ) {
    console.log(`a01. = ${i}, ${x16}`);
    break;
  }
}

const finish = performance.now();
console.log(`${finish - begin}ms`);
