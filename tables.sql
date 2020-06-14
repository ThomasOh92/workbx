CREATE TABLE IF NOT EXISTS accounts  (
	id SERIAL PRIMARY KEY,
	accountname TEXT,
  	email VARCHAR(254),
	password TEXT
);

CREATE TABLE IF NOT EXISTS stickynotes  (
	id SERIAL PRIMARY KEY,
	content TEXT,
	xPos NUMERIC,
	yPos NUMERIC,
	account_id INTEGER
);

CREATE TABLE IF NOT EXISTS weblinks  (
	id SERIAL PRIMARY KEY,
	link TEXT,
	linkName TEXT,
	xPos NUMERIC,
	yPos NUMERIC,
	account_id INTEGER
);

CREATE TABLE IF NOT EXISTS cloudlinks  (
	id SERIAL PRIMARY KEY,
	link TEXT,
	fileName TEXT,
	xPos NUMERIC,
	yPos NUMERIC,
	account_id INTEGER
);

CREATE TABLE IF NOT EXISTS locallinks  (
	id SERIAL PRIMARY KEY,
	link TEXT,
	fileName TEXT,
	xPos NUMERIC,
	yPos NUMERIC,
	account_id INTEGER
);