const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  database: "connect_four",
});

module.exports = pool;
