const { client } = require('../../db/connect');

function getAllEntries(req, res) {
  client
    .query('SELECT * FROM timesheets')
    .then((result) => res.status(200).json(result.rows))
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
      return res.status(200).json(result.rows);
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
        VALUES (current_timestamp, $1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;`,
      resData
    )
    .then((result) => {
      return res.status(200).json(result.rows);
    })
    .catch((err) => {
      if (err.code === '22P02') {
        // where prop doesn't exist in deployed version
        const badParam = err.where
          ? paramErrorMap[err.where.slice(25, 27)]
          : '';
        return res.status(400).json({
          reason: `Bad request body`,
          message: err.message,
          badParam,
        });
      }
      return res.status(500).json({
        message: 'Internal error',
        err,
      });
    });
}

module.exports = {
  getAllEntries,
  getOneEntry,
  createEntry,
};
