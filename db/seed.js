const parse = require('csv-parse');
const fs = require('fs');
const path = require('path');
const format = require('pg-format');
const moment = require('moment');
const { checkTable, createTable, seedTable } = require('./queries');

async function checkAndSeedDB(pool) {
  const checkTableRes = await pool.query(checkTable);

  if (!checkTableRes.rows[0].exists) {
    await pool.query(createTable);
    parse(
      fs.readFileSync(path.resolve(__dirname, '../sample_data.csv')),
      async (err, output) => {
        if (err) console.log(err); // throw error
        const rows = formatDates(output.slice(2));
        await pool.query(format(seedTable, rows));
        console.log('database seeded');
      }
    );
  } else {
    console.log('timesheets table exists');
  }
}

function formatDates(rows) {
  rows.forEach((row) => {
    const firstDate = row[0].split('/');
    const year = '20' + firstDate[2];
    const day = Number(firstDate[1]) < 10 ? '0' + firstDate[1] : firstDate[1];
    const month = '0' + firstDate[0];
    const date = moment(year + '-' + month + '-' + day)
      .toISOString()
      .slice(0, 10);
    row[0] = date;
  });
  return rows;
}

module.exports = checkAndSeedDB;
