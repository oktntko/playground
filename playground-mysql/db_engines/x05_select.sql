-- https://dev.mysql.com/doc/refman/8.0/ja/non-typed-operators.html

SELECT
  dbms
  , database_model
  , memo
  , ranking
  , score
FROM
  playground.db_engines
WHERE
  --  database_model <> 'Relational';
  database_model != 'Relational';

SELECT
  dbms
  , database_model
  , memo
  , ranking
  , score
FROM
  playground.db_engines
WHERE
  memo IS NOT NULL;
