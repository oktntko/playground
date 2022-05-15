-- https://db-engines.com/en/ranking_trend
-- https://sonnaka.com/210201-2/
INSERT
INTO playground.db_engines(dbms, database_model, memo, score, ranking)
VALUES ('Oracle', 'Relational', NULL, 1262.82, 1)
, ('MySQL', 'Relational', NULL, 1202.10, 2)
, (
  'Microsoft SQL Server'
  , 'Relational'
  , NULL
  , 941.20
  , 3
)
, ('PostgreSQL', 'Relational', NULL, 615.29, 4)
, ('MongoDB', 'Document', NULL, 478.24, 5)
, ('Redis', 'Key-value', NULL, 179.02, 6)
, ('IBM Db2', 'Relational', NULL, 160.32, 7)
, (
  'Elasticsearch'
  , 'Search engine'
  , NULL
  , 157.69
  , 8
)
, (
  'Microsoft Access'
  , 'Relational'
  , NULL
  , 143.44
  , 9
)
, ('SQLite', 'Relational', NULL, 134.73, 10);


SELECT
  *
FROM
  playground.db_engines;
