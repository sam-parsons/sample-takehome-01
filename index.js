require('dotenv').config();
const express = require('express');
const { client: pool } = require('./db/connect');
const PORT = process.env.PORT || 5000;
const checkAndSeedDB = require('./db/seed');
const timesheetController = require('./server/controllers/timesheet');

const main = async () => {
  const app = express();

  // json parsins and static files
  app.use(express.json());
  app.use(express.static('build'));

  // seed table if doesn't exist
  await checkAndSeedDB(pool);

  // Routes
  app.get('/api/timesheets', timesheetController.getAllEntries);

  app.get('/api/timesheets/:client', timesheetController.getOneEntry);

  app.post('/api/timesheets', timesheetController.createEntry);

  app.listen(PORT, () => console.log(`PORT: ${PORT}`));
};

main().catch((err) => {
  console.error(err);
});
