-- JOIN
SELECT
  ENGINES.*
  , RANKINGS.calculating_date
  , RANKINGS.ranking
  , RANKINGS.score
FROM
  db_engines AS ENGINES
  INNER JOIN db_engine_rankings AS RANKINGS
    ON ENGINES.db_engine_id = RANKINGS.db_engine_id;

INSERT
INTO db_engine_rankings(db_engine_id, calculating_date, ranking, score)
VALUES (1, '2022-04-01', 1, 1254.82)
, (2, '2022-04-01', 2, 1204.16)
, (3, '2022-04-01', 3, 938.46)
, (4, '2022-04-01', 4, 614.46)
, (5, '2022-04-01', 5, 483.38)
, (6, '2022-04-01', 6, 177.61)
, (7, '2022-04-01', 8, 160.45)
, (8, '2022-04-01', 7, 160.83)
, (9, '2022-04-01', 10, 132.79)
, (1, '2022-03-01', 1, 1269.94)
, (2, '2022-03-01', 2, 1236.38)
, (3, '2022-03-01', 3, 992.66)
, (4, '2022-03-01', 4, 559.25)
, (5, '2022-03-01', 5, 481.02)
, (6, '2022-03-01', 7, 162.17)
, (7, '2022-03-01', 6, 166.66)
, (8, '2022-03-01', 8, 155.35)
, (9, '2022-03-01', 9, 126.69);

SELECT
  ENGINES.*
  , RANKINGS.calculating_date
  , RANKINGS.ranking
  , RANKINGS.score
FROM
  db_engines AS ENGINES
  INNER JOIN db_engine_rankings AS RANKINGS
    ON ENGINES.db_engine_id = RANKINGS.db_engine_id;
