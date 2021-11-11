const { Client } = require('pg');

let config = {};

if (process.env.DATABASE_URL) {
  config.connectionString = process.env.DATABASE_URL;
} else {
  config = {
    user: process.env.user,
    host: 'localhost',
    database: 'postgres',
    password: process.env.password,
    port: 5432,
  };
}

const client = new Client(config);
client
  .connect()
  .then(() => console.log('connected'))
  .catch((err) => {
    throw new Error(err);
  });

module.exports = { client };
