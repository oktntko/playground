#
# 10進数、8進数、2進数、すべてで回文数となる数値のうち、
# 10進数の10以上で最小の数は？
#
from datetime import datetime
from itertools import count

begin = datetime.now().microsecond

for i in count(start=10):
  b02 = format(i, "b")
  o08 = format(i, "o")
  d10 = format(i, "d")
  x16 = format(i, "x")

  if b02 == b02[::-1] and o08 == o08[::-1] and d10 == d10[::-1]:
    print(f"a01. = {i}, {x16}")
    break

finish = datetime.now().microsecond
print(f"{finish - begin}ms")
