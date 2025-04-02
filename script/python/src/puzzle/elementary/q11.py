# tsのコードをチャットGPTに書いてもらった

import time


def sum_of_digits(n: int) -> int:
  return sum(int(digit) for digit in str(n))
  # 1. str(n) 整数 n を文字列に変換します。
  #   n = 123
  #   str(n)  # "123"
  #
  # 2. for digit in str(n) 変換した文字列を1文字ずつ取り出します。
  #   for digit in "123":
  #     print(digit)
  #   => "1", "2", "3"
  #
  # 3. int(digit) for digit in str(n) 各文字（桁）を整数に変換します。
  #   [int(digit) for digit in "123"]
  #   => [1, 2, 3]
  #
  # 4. sum(...) リストの要素を合計します。
  #   sum([1, 2, 3])
  #   => 1 + 2 + 3 = 6


def find_fibonacci_divisibles(count: int):
  n: list[tuple[int, int, int]] = []
  a, b = 1, 1

  while len(n) < count:
    c = a + b
    a, b = b, c

    x = sum_of_digits(c)
    if c % x == 0:
      n.append((c, x, c // x))

  return n


def main():
  start = time.perf_counter()
  result = find_fibonacci_divisibles(11)

  for row in result:
    print(row)

  end = time.perf_counter()
  print(f"{(end - start) * 1000:.3f}ms")


if __name__ == "__main__":
  main()
