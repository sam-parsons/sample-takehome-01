const { Client } = require('pg');

const config = {
  connectionString: process.env.DATABASE_URL || url,
};
const client = new Client(config);

client
  .connect()
  .then(() => console.log('connected to db'))
  .catch((err) => {
    throw new Error(err);
  });

module.exports = { client };
