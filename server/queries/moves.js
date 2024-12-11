const games = require("../controllers/game");
const pool = require("../database/dbConfig");

//INSERT a new move
const addMove = async ({ game_id, player_id, move }) => {
    try {
        const result = await pool.query("INSERT INTO games_moves(game_id, player_id, move) VALUES ($1, $2, $3) RETURNING *", [game_id, player_id, move]
        );
        return result.rows[0];
    } catch (error) {
        return error;
    }
};

//GET all moves for a game
const getGameMoves = async (game_id) => {
    try {
        const result = await pool.query("SELECT * FROM games_moves WHERE game_id = $1 ORDER BY move_time ASC", [game_id]
        );
        return result.rows;
    } catch (error) {
        return error;
    }
};

//GET the latest move for a games

const getLatestMove = async (game_id) => {
    try {
        const result = await pool.query("SELECT * FROM games_moves WHERE game_id = $1 ORDER BY move_time DESC LIMIT 1 ", [game_id]

        );
        return result.rows[0];
    } catch (error) {
        return error;
    }
};

module.exports = {
    addMove,
    getGameMoves,
    getLatestMove,
};