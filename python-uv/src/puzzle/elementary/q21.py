import time

start = time.perf_counter()


arr = [True]
count = 0

while count < 2014:
  arr = [
    ((arr[i - 1] if i > 0 else False) != (arr[i] if i < len(arr) else False))
    for i in range(len(arr) + 1)
  ]
  count += arr.count(False)

print(len(arr))


end = time.perf_counter()
print(f"{(end - start) * 1000:.3f}ms")
