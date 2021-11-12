const { client } = require('../../db/connect');

// map used for bad INSERT requests
const paramErrorMap = {
  $1: 'client',
  $2: 'project',
  $3: 'firstName',
  $4: 'lastName',
  $5: 'productCode',
  $6: 'hours',
  $7: 'billable',
  $8: 'billableRate',
};

function getAllEntries(req, res) {
  client
    .query('SELECT * FROM timesheets')
    .then((result) => res.json(result.rows))
    .catch((err) =>
      res.status(500).json({
        message: 'Internal error',
        err,
      })
    );
}

function getOneEntry(req, res) {
  client
    .query('SELECT * FROM timesheets WHERE client=$1', [req.params.client])
    .then((result) => {
      if (result.rows.length === 0)
        return res.status(404).json('Client does not exist');
      return res.json(result.rows);
    })
    .catch((err) =>
      res.status(500).json({
        message: 'Internal error',
        err,
      })
    );
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
      if (err.code === '22P02') {
        const badParam = paramErrorMap[err.where.slice(25, 27)];
        return res.status(400).json({
          reason: `Bad request body`,
          message: err.message,
          badParam,
        });
      }
      return res.status(500).json('Internal error');
    });
}

module.exports = {
  getAllEntries,
  getOneEntry,
  createEntry,
};
