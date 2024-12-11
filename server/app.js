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

app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const { rows } = await db.query('SELECT * FROM players WHERE username = $1', [username]);
    const user = rows[0];

    if (!user) {
      return res.status(400).send('Invalid username or password.');
    }

    // Compare passwords
    if (user.password !== password) {
      return res.status(400).send('Invalid username or password.');
    }

    // Update last login timestamp
    await db.query('UPDATE players SET last_login = NOW() WHERE id = $1', [user.id]);

    res.json({ username: user.username, lastLogin: user.last_login });
  } catch (err) {
    console.error("Sign-in error:", err);
    res.status(500).send('Server error during sign-in.');
  }
});


app.get("*", (req, res) => {
  res.status(404).send("The request you are looking for does not exist!");
});

module.exports = app;
