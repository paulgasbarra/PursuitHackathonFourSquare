const express = require('express');
const games = express.Router();
const { getAllGames, getOneGame, createOneGame, updateOneGame, deleteOneGame } = require("../queries/games");

//GET all games

games.get("/", async (req, res) => {
    try {
        const allGames = await getAllGames();
        res.status(200).json({ payload: allGames });
    } catch (error) {
        res.status(404).json({ payload: error.message })
    }
});

//GET a single game by ID
games.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const game = await getOneGame(id);
        if (game) {
            res.status(200).json({ payload: game })
        } else {
            res.status(404).json({ error: "Game not found" });
        }
    } catch (error) {
        res.status(500).json({ payload: error.message })
    }
});

//CREATE a new game
games.post("/", async (req, res) => {
    try {
        const gameData = req.body;
        const newGame = await createOneGame(gameData);
        res.status(201).json({ payload: newGame });

    } catch (error) {
        res.status(400).json({ payload: error.message });
    }
});

//UPDATE a game by ID

games.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const gameData = req.body;
        const updatedGame = await updateOneGame(id, gameData);
        if (updatedGame) {
            res.status(200).json({ payload: updatedGame });
        } else {
            res.status(404).json({ error: "Game not found" });
        }
    } catch (error) {
        res.status(400).json({ payload: error.message });
    }
});

//DELETE a game by ID
games.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGame = await deleteOneGame(id);
        if (deletedGame) {
            res.status(200).json({ payload: deletedGame });
        } else {
            res.status(404).json({ error: "Game not found" });
        }
    } catch (error) {
        res.status(500).json({ payload: error.message })
    }
});

module.exports = games;