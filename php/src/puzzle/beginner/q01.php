<?php

$begin = microtime(true);

for ($i = 10;; ++$i) {
  $b02 = decbin($i);
  $o08 = decoct($i);
  $d10 = (string) $i;
  $x16 = dechex($i);

  if (
    $b02 === strrev($b02)
    && $o08 === strrev($o08)
    && $d10 === strrev($d10)
  ) {
    echo "a01. = {$i}, {$x16}\n";

    break;
  }
}

$finish = microtime(true);
echo (($finish - $begin) * 1000)."ms\n";
