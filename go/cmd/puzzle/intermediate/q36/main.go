package main

import (
	"fmt"
	"strconv"
	"time"
)

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

	results := []struct {
		N       int
		Seven   int
		Reverse bool
	}{}

	for n := 1; n <= 50; n++ {
		if n%2 == 0 || n%5 == 0 {
			continue
		}

		for i := 1; ; i += 2 {
			b02 := strconv.FormatInt(int64(i), 2)
			b02i, _ := strconv.Atoi(b02)
			seven := b02i * 7

			if seven%n == 0 {
				if isPalindrome(b02) {
					results = append(results, struct {
						N       int
						Seven   int
						Reverse bool
					}{n, seven, true})
				}
				break
			}
		}
	}

	fmt.Println(" N   | Seven    | Reverse")
	fmt.Println("----------------------")
	for _, res := range results {
		fmt.Printf("%2d  | %9d | %v\n", res.N, res.Seven, res.Reverse)
	}

	elapsed := time.Since(start)
	fmt.Printf("Elapsed time: %v\n", elapsed)
}
