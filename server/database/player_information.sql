-- drop database - step one, incase there is already a db, drop it
DROP DATABASE IF EXISTS players_dev;


CREATE DATABASE players_dev;

CREATE TABLE players(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    ties INTEGER DEFAULT 0
);

