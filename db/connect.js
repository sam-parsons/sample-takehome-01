const { Pool } = require('pg');

// need to figure this out
const pool = new Pool({
  user: process.env.user,
  host: 'localhost',
  database: 'postgres',
  password: process.env.password,
  port: 5432,
});

module.exports = pool;
