package main

import (
	"fmt"
	"time"
)

func generateSequence() int {
	arr := []bool{true}

	for count := 0; count < 2014; {
		newArr := make([]bool, len(arr)+1)

		for i := range newArr {
			prev := false
			if i > 0 {
				prev = arr[i-1]
			}

			curr := false
			if i < len(arr) {
				curr = arr[i]
			}

			result := prev != curr
			if !result {
				count++
			}

			newArr[i] = result
		}

		arr = newArr
	}

	return len(arr)
}

func main() {
	start := time.Now()
	result := generateSequence()
	elapsed := time.Since(start)

	fmt.Println(result) // 期待する答え: 75
	fmt.Printf("%.3fms\n", float64(elapsed.Milliseconds()))
}
