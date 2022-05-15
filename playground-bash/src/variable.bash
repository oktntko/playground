#!/usr/bin/env bash

# 関数の宣言
main() {
  # $# は引数の数
  if [ "$#" = '0' ]; then
    echo "引数なし"
  else
    # $@ は引数自体
    # local param
    for param in "$@"; do echo "$param"; done
  fi

  # グローバル変数の参照
  echo "$GREET"

  # ローカル変数の宣言
  local greet
  greet="Ahoj světe!"
  echo "$greet"

  # param 変数はここでも使える
  # echo "$param"
}

# グローバル変数の宣言
GREET="Hello World"

# 関数の実行
main "$@"

# param 変数はlocal宣言していないならここでも使える
# echo "$param"
