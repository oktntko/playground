#!/usr/bin/env bash

echo "足し算" $((1 + 1))

echo "引き算" $((100 - 1))

echo "掛け算" $((6 * 2))

echo "割り算" $((5 / 2))

echo "あまり" $((5 % 2))

if ((1 <= 2)); then
  echo "lesser or equal"
fi

if ((1 < 2)); then
  echo "lesser"
fi

if ((1 != 2)); then
  echo "not equal"
fi

if ((1 == 1)); then
  echo "equal"
fi
