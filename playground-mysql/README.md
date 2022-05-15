# MySQL

## 実行環境

- Windows, WSL2
- Docker

## 準備

```
docker-compose up -d
cp .env.example .env
```

## クライアントツール

どれも使いやすい。慣れ。

- A5:SQL Mk-2
  - MySQL に限らず使える。
  - https://a5m2.mmatsubara.com/
- HeidiSQL
  - MySQL に限らず使える。
  - https://www.heidisql.com/
- mycli
  - MySQL 専用。CUI。 他の DB は同シリーズがある。[こちら](https://github.com/orgs/dbcli/repositories)
  - https://www.mycli.net/
  - `mycli --host=localhost --port=3306 --user=root --password=root --database=playground`

## やること

- [x] CREATE TABLE
- [x] INSERT
- [x] UPDATE
- [x] DELETE
- [x] SELECT
- [x] ALTER TABLE, FOREIGN KEY
- [x] JOIN
- [x] あとから読む
  - https://dev.mysql.com/doc/refman/8.0/ja/tutorial.html
