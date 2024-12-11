const express = require('express');
const players = express.Router();
const {
    getPlayersByName,
    updatePlayerStats,
    createPlayer
} = require("../queries/players");

//GET players by name
players.get("/name/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const player = await getPlayersByName(username);
        if (player) {
            res.status(200).json({ payload: player });
        } else {
            res.status(404).json({ error: "Player not found" });
        }
    } catch (error) {
        res.status(500).json({ payload: error.message });
    }
});

//UPDATE player stats (wins, losses, draws)

players.put("/stats/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { wins, losses, draws } = req.body;
        const updatedPlayer = await updatePlayerStats(id, { wins, losses, draws });
        if (updatedPlayer) {
            res.status(200).json({ payload: updatedPlayer });
        } else {
            res.status(404).json({ error: "Player not found" });
        }
    } catch (error) {
        res.status(400).json({ payload: error.message });
    }
});

//CREATE a new player
players.post("/", async (req, res) => {
    try {
        const playerData = req.body;
        const newPlayer = await createPlayer(playerData);
        res.status(201).json({ payload: newPlayer });
    } catch (error) {
        res.status(400).json({ payload: error.message });
    }
});

module.exports = players;