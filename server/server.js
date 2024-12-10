const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");

// Load environment variables
require("dotenv").config();

// PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .connect()
  .then(() => {
    console.log("Connected to the database successfully!");
    // You can also run a simple query here
    return pool.query("SELECT NOW()");
  })
  .then((res) => console.log(res.rows[0])) // This will log the current time from the database if successful
  .catch((err) => {
    console.error("Database connection failed", err.stack);
  })
  .finally(() => pool.end());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get("/players", async (req, res) => {
  try {
    const query = "SELECT * FROM players ORDER BY id";
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error retrieving players", err.stack);
    res.status(500).send("Failed to retrieve players");
  }
});

// Route to add a new user
app.post("/addplayer", async (req, res) => {
  const { name, email, password } = req.body;
  const query =
    "INSERT INTO players (name, email, password, wins, losses, ties) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
  const values = [name, email, password, 0, 0, 0]; // Defaults for wins, losses, and ties are set here, but can also be omitted if defaults are defined in the table schema
  console.log("values for player", values);

  try {
    const { rows } = await pool.query(query, values);
    res.status(201).send(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error adding new player");
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
