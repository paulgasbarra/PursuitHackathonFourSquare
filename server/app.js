const express = require("express");
const app = express();
const db = require("./database/dbConfig");

app.get("/", (req, res) => {
  res.send("Welcome to Connect 4!");
});

app.get("/players", async (req, res) => {
  console.log("GET /players");
  try {
    const { rows } = await db.query("SELECT * FROM players");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while retrieving players");
  }
});

app.get("*", (req, res) => {
  res.status(404).send("The request you are looking for does not exist!");
});

module.exports = app;
