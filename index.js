require('dotenv').config();
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const { client } = require('./db/connect');
const PORT = process.env.PORT || 5000;
const checkAndSeedDB = require('./db/seed');
const timesheetController = require('./server/controllers/timesheet');

const main = async () => {
  const app = express();

  // json parsing and static files
  app.use(express.json());
  app.use(express.static('build'));
  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

  // seed timesheets table if doesn't exist
  await checkAndSeedDB(client);

  // Routes
  app.get('/api/timesheets', timesheetController.getAllEntries);
  app.get('/api/timesheets/:client', timesheetController.getOneEntry);
  app.post('/api/timesheets', timesheetController.createEntry);

  app.listen(PORT, () => console.log(`PORT: ${PORT}`));
};

main().catch((err) => {
  console.error(err);
});
