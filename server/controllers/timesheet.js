const { client } = require('../../db/connect');

function getAllEntries(req, res) {
  client
    .query('SELECT * FROM timesheets')
    .then((result) => res.json(result.rows))
    .catch((err) => res.status(500).json('Internal error'));
}

function getOneEntry(req, res) {
  client
    .query('SELECT * FROM timesheets WHERE client=$1', [req.params.client])
    .then((result) => {
      if (result.rows.length === 0)
        return res.status(404).json('Client does not exist');
      return res.json(result.rows);
    })
    .catch((err) => res.status(500).json('Internal error'));
}

function createEntry(req, res) {
  const resData = [
    req.body.client,
    req.body.project,
    req.body.firstName,
    req.body.lastName,
    req.body.productCode,
    req.body.hours,
    req.body.billable,
    req.body.billableRate,
  ];
  client
    .query(
      `INSERT INTO timesheets 
        (date, client, project, first_name, last_name, project_code, hours, billable, billable_rate) 
        VALUES (current_timestamp, $1, $2, $3, $4, $5, $6, $7, $8);`,
      resData
    )
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      if (err.code === '22P02') return res.status(400).json('Bad request body');
      return res.status(500).json('Internal error');
    });
}

module.exports = {
  getAllEntries,
  getOneEntry,
  createEntry,
};
