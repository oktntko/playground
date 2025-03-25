<?php

use PhpCsFixer\Config;

// https://mlocati.github.io/php-cs-fixer-configurator/#version:3.73
return (new Config())
  ->setRules([
    '@PSR12' => true,
    '@PhpCsFixer' => true,
    '@PHP84Migration' => true,
    'yoda_style' => false,
  ])
  ->setIndent('  ')
  ->setLineEnding("\n")
;
