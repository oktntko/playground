import { R } from '~/lib/remeda';

function main() {
  return R.range(1, 50 + 1)
    .filter((n) => n % 2 !== 0 && n % 5 !== 0)
    .map((n) => {
      for (let i = 1; ; i += 2) {
        const b02 = i.toString(2);
        const seven = Number(b02) * 7;

        if (seven % n === 0) {
          return { n, seven, reverse: b02 === b02.split('').reverse().join('') };
        }
      }
    })
    .filter((x) => x.reverse);
}

const begin = performance.now();

console.table(main());

const finish = performance.now();
console.log(`${finish - begin}ms`);
