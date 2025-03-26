package main

import (
	"fmt"
	"strconv"
	"time"
)

func main() {
	start := time.Now()

	FROM := time.Date(1964, 10, 10, 0, 0, 0, 0, time.UTC)
	END := time.Date(2020, 7, 24, 0, 0, 0, 0, time.UTC)

	for d := FROM; !d.After(END); d = d.AddDate(0, 0, 1) {
		base, _ := strconv.Atoi(d.Format("20060102"))
		b02 := strconv.FormatInt(int64(base), 2)
		reversedB02 := reverseString(b02)
		transformed, _ := strconv.ParseInt(reversedB02, 2, 64)

		if int64(base) == transformed {
			fmt.Printf("a07. = %s\n", d.Format("2006-01-02"))
		}
	}

	elapsed := time.Since(start)
	fmt.Printf("%s\n", elapsed)
}

// 文字列を反転する関数
func reverseString(s string) string {
	runes := []rune(s)
	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
		runes[i], runes[j] = runes[j], runes[i]
	}
	return string(runes)
}
