UPDATE playground.db_engines
SET
  memo = 'Oracle Database（オラクル データベース）とは、米国オラクル (Oracle) が開発・販売している、関係データベース管理システム (RDBMS) のことである。Oracle Databaseは世界初の商用RDBMSであり、メインフレームからパーソナルコンピュータまで、幅広いプラットフォームをサポートしている。'
WHERE
  dbms = 'Oracle';

UPDATE playground.db_engines
SET
  memo = 'MySQL（マイ・エスキューエル、海外ではマイ・シークェルとも）は、オープンソースのリレーショナルデータベース管理システム (RDBMS) である。その名前は、共同設立者のミカエル・ウィデニウスの娘の名前である「My」と、Structured Query Languageの略称である「SQL」を組み合わせたものである。'
WHERE
  dbms = 'MySQL';

UPDATE playground.db_engines
SET
  memo = 'Microsoft SQL Server（マイクロソフト・エスキューエル・サーバー）とは、マイクロソフトが開発する、関係データベース管理システム（RDBMS）である。 略称はSQL Server、またはMS SQL等。 主要な問い合わせ言語（クエリ言語）は、T-SQLとANSI SQLである。'
WHERE
  dbms = 'Microsoft SQL Server';

SELECT
  *
FROM
  playground.db_engines;
