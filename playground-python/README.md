# Python

## 環境構築

[環境構築](../README.md#環境構築)

### つづき

```sh
# asdf のプラグインを追加する
asdf plugin-add python
# 実行環境をインストールする
asdf install # pythonは時間がかかる
```

```sh
# pip を最新化する
pip install --upgrade pip
# pipenv をインストールする
pip install pipenv && \
   asdf reshim python
```

```sh
python --version
pip --version
pipenv --version
```

```sh
echo "export PIPENV_VENV_IN_PROJECT=true # python pipenv" >> ~/.bashrc
. ~/.bashrc
```

```sh
# このディレクトリの依存パッケージをインストールする
pipenv install --dev
```

## プログラムの実行

```sh
# pipenv run python src/[filename].py
pipenv run python src/greet.py
# もしくは
pipenv shell # でpipenv環境に入って
python src/greet.py # で実行
# Ctrl + D で抜ける
```

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
