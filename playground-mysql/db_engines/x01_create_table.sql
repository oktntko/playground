-- https://db-engines.com/en/ranking_trend
-- https://sonnaka.com/210201-2/
DROP TABLE IF EXISTS playground.db_engines;

CREATE TABLE IF NOT EXISTS playground.db_engines(
  dbms VARCHAR (255) NOT NULL
  , database_model VARCHAR (255) NOT NULL
  , memo VARCHAR (255)
  , ranking INT
  , score DECIMAL (32, 8)
)
