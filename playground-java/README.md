# Java

## 環境構築

[環境構築](../README.md#環境構築)

### つづき

```sh
# asdf のプラグインを追加する
asdf plugin-add java
# 実行環境をインストールする
asdf install
```

```sh
echo ". ~/.asdf/plugins/java/set-java-home.bash # java" >> ~/.bashrc
. ~/.bashrc
```

```sh
java --version
```

## プログラムの実行

プログラムは VSCode の拡張機能で実行する

> **WARNING**: 挙動が不安定。VSCode の起動が鍵。原因不明

- 左下 > JAVA PROJECTS > Clean Workspace
- Ctrl + Shift + P > Reload Window

## やること

### 初級編

- [x] コンソール出力
- [x] コメントアウト
- [ ] 変数宣言、データ型
- [ ] 四則演算
- [ ] 文字列操作
- [ ] 分岐条件
- [ ] ループ
- [ ] コンソール入力
- [ ] 日付操作

### 休憩

- [ ] コンソールアプリ作成

### 中級編

- [ ] ＤＢ操作
- [ ] ファイル操作

### 実践編

- [ ] client app
- [ ] server app

## Acknowledgements

- [Git Commit message Emoji](https://gist.github.com/parmentf/035de27d6ed1dce0b36a)
