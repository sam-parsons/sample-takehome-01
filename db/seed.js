const parse = require('csv-parse');
const fs = require('fs');
const path = require('path');
const format = require('pg-format');
const moment = require('moment');
const { checkTable, createTable, seedTable } = require('./queries');

async function checkAndSeedDB(pool) {
  try {
    const checkTableRes = await pool.query(checkTable);
    // if timesheets table doesn't exist, create it
    if (!checkTableRes.rows[0].exists) {
      await pool.query(createTable);
      // parse csv
      parse(
        fs.readFileSync(path.resolve(__dirname, '../sample_data.csv')),
        async (err, output) => {
          if (err) throw new Error(err);
          const rows = formatDates(output.slice(2));
          // seed db
          await pool.query(format(seedTable, rows));
          console.log('database seeded');
        }
      );
    } else {
      console.log('timesheets table exists');
    }
  } catch (err) {
    throw new Error(err);
  }
}

function formatDates(rows) {
  rows.forEach((row) => {
    const dateArray = row[0].split('/');
    // format year, day, month
    const year = '20' + dateArray[2];
    const day = Number(dateArray[1]) < 10 ? '0' + dateArray[1] : dateArray[1];
    const month = '0' + dateArray[0];
    // create date string in YYYY-MM-DD format
    const date = moment(year + '-' + month + '-' + day)
      .toISOString()
      .slice(0, 10);
    // reassign new date string to row
    row[0] = date;
  });
  return rows;
}

module.exports = checkAndSeedDB;
