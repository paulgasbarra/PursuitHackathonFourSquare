const pool = require("../database/dbConfig");

//GET all games

const getAllGames = async () => {
    try {
        const result = await pool.query("SELECT * FROM games");
        return result.rows;
    } catch (error) {
        return error;
    }
};

// GET a game by ID
const getOneGame = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM games WHERE id= $1", [id]);
        return result.rows[0];
    } catch (error) {
        return error;
    }
};

//CREATE a new game
const createOneGame = async (gameData) => {
    const { player1_id, player2_id, status } = gameData;

    try {
        const result = await pool.query("INSERT INTO games(player1_id, player2_id, status) VALUES  ($1, $2, $3 ) RETURNING *",
            [player1_id, player2_id, status]
        );
        return result.rows[0];
    } catch (error) {
        return error;
    }
};

//UPDATE a game
const updateOneGame = async (id, gameData) => {
    const { winner_id, status, end_time } = gameData;
    try {
        const result = await pool.query("UPDATE games SET winner_id = $1, status = $2, end_time = $3 WHERE id = $4 RETURNING *",
            [winner_id, status, end_time, id]
        );
        return result.rows[0];
    } catch (error) {
        return error;
    }
};

//DELETE a game
const deleteOneGame = async (id) => {
    try {
        const result = await pool.query("DELETE FROM games WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    } catch (error) {
        return error;
    }
};

module.exports = {
    getAllGames,
    getOneGame,
    createOneGame,
    updateOneGame,
    deleteOneGame
};
