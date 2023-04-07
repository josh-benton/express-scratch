DROP TABLE IF EXISTS pitching_rotation;

CREATE TABLE pitching_rotation (
  id SERIAL PRIMARY KEY,
  player_name VARCHAR(50) NOT NULL,
  throws VARCHAR(50) NOT NULL,
  earned_run_average DECIMAL(4,2) NOT NULL,
  hall_of_fame BOOLEAN NOT NULL DEFAULT false
);