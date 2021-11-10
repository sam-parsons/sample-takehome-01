const pg = require('pg');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {res.send("successly")});

app.listen(PORT, () => console.log("connected"));