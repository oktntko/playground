-- 元テーブルの変更
ALTER TABLE playground.db_engines ADD COLUMN db_engine_id INT UNSIGNED NOT NULL FIRST;
-- ALTER TABLE playground.db_engines DROP COLUMN db_engine_id;

UPDATE playground.db_engines
, (
  SELECT
    ROW_NUMBER() OVER (ORDER BY ranking ASC) AS db_engine_id
    , dbms
  FROM
    playground.db_engines
) AS ID_SET
SET
  db_engines.db_engine_id = ID_SET.db_engine_id
WHERE
  db_engines.dbms = ID_SET.dbms;

ALTER TABLE playground.db_engines ADD PRIMARY KEY (db_engine_id);
-- ALTER TABLE playground.db_engines DROP PRIMARY KEY;

ALTER TABLE playground.db_engines ADD UNIQUE unique_dbms(dbms);
-- ALTER TABLE playground.db_engines DROP INDEX unique_dbms;

-- テーブル構成の変更
ALTER TABLE playground.db_engines DROP COLUMN ranking;

ALTER TABLE playground.db_engines DROP COLUMN score;

DROP TABLE IF EXISTS db_engine_rankings;

CREATE TABLE IF NOT EXISTS db_engine_rankings(
  id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT
  , db_engine_id INT unsigned NOT NULL
  , calculating_date DATE NOT NULL
  , ranking INT NOT NULL
  , score DECIMAL (32, 8) NOT NULL
  , UNIQUE KEY unique_db_engine_id_calculating_date(db_engine_id, calculating_date)
  , CONSTRAINT foreign_db_engine_id FOREIGN KEY (db_engine_id) REFERENCES db_engines(db_engine_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT
INTO db_engine_rankings(db_engine_id, calculating_date, score, ranking)
VALUES (1, '2022-05-01', 1262.82, 1)
, (2, '2022-05-01', 1202.10, 2)
, (3, '2022-05-01', 941.20, 3)
, (4, '2022-05-01', 615.29, 4)
, (5, '2022-05-01', 478.24, 5)
, (6, '2022-05-01', 179.02, 6)
, (7, '2022-05-01', 160.32, 7)
, (8, '2022-05-01', 157.69, 8)
, (9, '2022-05-01', 134.73, 10);
