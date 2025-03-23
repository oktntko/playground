#
# YYYYMMDD形式の日付を、2進数→逆にする→10進数としたとき、元の値と同じになるものは？
#
# /// script
# dependencies = [
#   "python-dateutil",
# ]
# ///
from datetime import date, datetime

# https://github.com/astral-sh/uv/issues/12030
from dateutil.rrule import DAILY, rrule

begin = datetime.now().microsecond / 1000

from_date = date(1964, 10, 10)
end_date = date(2020, 7, 24)

for d in rrule(DAILY, dtstart=from_date, until=end_date):
  base = int(d.strftime("%Y%m%d"))
  b02 = format(base, "b")[::-1]
  transformed = int(b02, 2)

  if base == transformed:
    print(f"a07. = {d.strftime('%Y-%m-%d')}")

finish = datetime.now().microsecond / 1000
print(f"{finish - begin}ms")
