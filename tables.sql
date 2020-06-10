CREATE TABLE IF NOT EXISTS accounts  (
	id SERIAL PRIMARY KEY,
	accountname TEXT,
  	email VARCHAR(254),
	password TEXT
);