const pool = require("../database/dbConfig");

//GET player by name
const getPlayersByName = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM players WHERE id = $1", [id]);
        return result.rows;
    } catch (error) {
        return error;
    }
};

//UPDATE player stats
const updatePlayerStats = async (id, { wins, losses, draws }) => {
    try {
        const result = await pool.query("UPDATE players SET wins = $1, losses = $2, draws= $3 WHERE id = $4 RETURNING *", [wins, losses, draws, id]
        );
        return result.rows[0];
    } catch (error) {
        return error;
    }
};

//CREATE new player
const createPlayer = async (playerData) => {
    const { id, username, email, password } = playerData;
    try {
        const result = await pool.query("INSERT INTO players (id,username, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [id, username, email, password]
        );
        return result.rows[0];
    } catch (error) {
        return error;
    }
};

module.exports = {
    getPlayersByName,
    updatePlayerStats,
    createPlayer
};