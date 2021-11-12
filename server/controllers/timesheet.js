const { client } = require('../../db/connect');

function getAllEntries(req, res) {
  client
    .query('SELECT * FROM timesheets')
    .then((result) => res.json(result.rows))
    .catch((err) => console.log(err));
}

function getOneEntry(req, res) {
  client
    .query('SELECT * FROM timesheets WHERE client=$1', [req.params.client])
    .then((result) => res.json(result.rows))
    .catch((err) => console.log(err));
}

function createEntry(req, res) {
  const resData = [
    req.body.date,
    req.body.client,
    req.body.project,
    req.body.productCode,
    req.body.hours,
    req.body.billable,
    req.body.billableHours,
  ];
  client
    .query(
      'INSERT INTO timesheets (date, client, project, product_code, hours, billable, billableours) VALUES ($1, $2, $3, $4, $5, $6, $7);',
      resData
    )
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
}

module.exports = {
  getAllEntries,
  getOneEntry,
  createEntry,
};
