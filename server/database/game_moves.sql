-- step 1 - connect to db
\c game_moves_dev;


-- step  2 - add values into table 
INSERT INTO  (name, description) VALUES


CREATE TABLE moves (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    player_id INTEGER REFERENCES players(id) ON DELETE CASCADE,
    column INTEGER CHECK (column BETWEEN 0 AND 6),
    row INTEGER CHECK (row BETWEEN 0 AND 7),
    move_number INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    current_turn INTEGER NOT NULL,
);



