const { Client } = require('pg');

let config = {};
config.connectionString = process.env.DATABASE_URL || url;
const client = new Client(config);

client
  .connect()
  .then(() => console.log('connected'))
  .catch((err) => {
    throw new Error(err);
  });

module.exports = { client };
