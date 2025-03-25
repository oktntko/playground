<?php

$begin = microtime(true);

// BCMath版: bcmath 関数を使う
// GMP拡張 を使う方が早いらしいが、有効化できなかった

$n = [];
$a = '1';
$b = '1';

while (count($n) < 11) {
  $c = bcadd($a, $b); // bcadd($a, $b): + の代替
  $a = $b;
  $b = $c;

  $digits = str_split($c);
  $x = array_reduce($digits, fn ($sum, $digit) => bcadd($sum, $digit), '0');

  if (bcmod($c, $x) /* bcmod($a, $b): % の代替 */ == '0') {
    $n[] = [$c, $x, bcdiv($c, $x)/* bcdiv($a, $b): / の代替 */];
  }
}

echo "a07. = \n";
foreach ($n as $row) {
  echo implode("\t", $row)."\n";
}

$finish = microtime(true);
echo (($finish - $begin) * 1000)."ms\n";
