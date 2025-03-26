package main

import (
	"fmt"
	"strconv"
	"time"
)

// 文字列が回文かどうかを判定する関数
func isPalindrome(s string) bool {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		if s[i] != s[j] {
			return false
		}
	}
	return true
}

func main() {
	start := time.Now()

	for i := 10; ; i++ {
		b02 := strconv.FormatInt(int64(i), 2)  // 2進数
		o08 := strconv.FormatInt(int64(i), 8)  // 8進数
		d10 := strconv.Itoa(i)                 // 10進数
		x16 := strconv.FormatInt(int64(i), 16) // 16進数

		if isPalindrome(b02) && isPalindrome(o08) && isPalindrome(d10) {
			fmt.Printf("a01. = %d, %s\n", i, x16)
			break
		}
	}

	elapsed := time.Since(start)
	fmt.Printf("%s\n", elapsed)
}
