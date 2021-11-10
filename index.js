const express = require('express');
const { Pool } = require('pg');
const app = express();

const PORT = process.env.PORT || 5000;

const pool = new Pool({ // create connection to database
  connectionString: process.env.DATABASE_URL,	// use DATABASE_URL environment variable from Heroku app 
  ssl: {
    rejectUnauthorized: false // don't check for SSL cert
  }
});

app.get('/', (req, res) => {
    pool.query("SELECT * FROM timesheets")
        .then(result => res.json(result))
        .catch(err => console.log(err));
});

app.listen(PORT, () => console.log("connected"));