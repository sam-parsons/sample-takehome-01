const checkTable = `
SELECT EXISTS 
(
  SELECT 1
  FROM information_schema.tables 
  WHERE table_schema = 'public'
  AND table_name = 'timesheets'
);
`;

const createTable = `
CREATE TABLE timesheets 
(
  date DATE,
  client VARCHAR,
  project VARCHAR,
  project_code VARCHAR,
  hours FLOAT(2),
  billable BOOLEAN,
  first_name VARCHAR,
  last_name VARCHAR,
  billable_rate INTEGER
);
`;

const seedTable = `
INSERT INTO timesheets 
( 
  date, 
  client, 
  project, 
  project_code, 
  hours, 
  billable,
  first_name,
  last_name,
  billable_rate
) 
VALUES %L
`;

module.exports = {
  checkTable,
  createTable,
  seedTable,
};
