package main

import (
	"fmt"
	"math/big"
	"time"
)

func main() {
	start := time.Now()

	n := [][]*big.Int{}
	a := big.NewInt(1)
	b := big.NewInt(1)
	c := new(big.Int)

	for len(n) < 11 {
		c.Add(a, b)
		a.Set(b)
		b.Set(c)

		sum := big.NewInt(0)
		for _, digit := range c.String() {
			d, _ := new(big.Int).SetString(string(digit), 10)
			sum.Add(sum, d)
		}

		if new(big.Int).Mod(c, sum).Cmp(big.NewInt(0)) == 0 {
			n = append(n, []*big.Int{new(big.Int).Set(c), new(big.Int).Set(sum), new(big.Int).Div(c, sum)})
		}
	}

	fmt.Println("Fibonacci numbers satisfying the condition:")
	for _, row := range n {
		fmt.Printf("%s / %s = %s\n", row[0].String(), row[1].String(), row[2].String())
	}

	elapsed := time.Since(start)
	fmt.Printf("%s\n", elapsed)

	// Q. Go言語もbig型を使わないと桁あふれするんですか？
	// A. はい、Go言語でも通常の整数型 (int, uint64 など) を使うと、桁あふれ（オーバーフロー）します。
	//  そのため、大きな整数を扱う必要がある場合は math/big を使うのが一般的です。big.Int は任意精度整数を扱えるため、オーバーフローの心配なく計算できます。

	// Q. 160500643816367088 は桁あふれしますか？
	// A. 160500643816367088 は 18桁 なので、Goの int64 型 (最大 9,223,372,036,854,775,807、約19桁) には収まります。
	// したがって、int64 なら問題なく扱えます。ただし、フィボナッチ数列をさらに進めると int64 でもオーバーフローするため、安全に計算を続けるなら math/big を使うのがベストです。
}
