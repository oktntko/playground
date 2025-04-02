<?php

$begin = microtime(true);

$from = new DateTime('1964-10-10');
$end = new DateTime('2020-07-24');

while ($from <= $end) {
  $base = (int) $from->format('Ymd');
  $b02 = strrev(decbin($base));
  $transformed = bindec($b02);

  if ($base === $transformed) {
    echo 'a07. = '.$from->format('Y-m-d')."\n";
  }

  $from->modify('+1 day');
}

$finish = microtime(true);
echo (($finish - $begin) * 1000)."ms\n";
