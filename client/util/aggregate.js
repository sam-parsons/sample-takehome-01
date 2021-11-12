import round from './round';
import flatten from './flatten';

/**
 * Accepts an array of timesheet entries
 * Aggregates rows based on project name
 *  - accumulating hours, billable hours, and billable amounts
 *
 * Returns a flattened version of the aggregate data as below
 * {
 *  project: "---",
 *  client: "---",
 *  hours: xx.xx,
 *  billableHours: xxx.xx,
 *  billableAmount: xxx.xx,
 * }
 */
export default function aggregate(rows) {
  const data = {};

  rows.forEach((row) => {
    if (!data.hasOwnProperty(row.client)) {
      data[row.client] = {};
    }
    if (!data[row.client].hasOwnProperty(row.project)) {
      data[row.client][row.project] = {
        hours: 0,
        billableHours: 0,
        billableAmount: 0,
      };
    }
    // aggregate hours
    data[row.client][row.project].hours = round(
      data[row.client][row.project].hours + row.hours,
      2
    );
    // aggregate billable hours
    const isBillable = row.billable;
    if (isBillable) {
      data[row.client][row.project].billableHours = round(
        data[row.client][row.project].billableHours + row.hours,
        2
      );
      // aggregate billable amount
      data[row.client][row.project].billableAmount = round(
        data[row.client][row.project].billableAmount +
          row.hours * row.billable_rate,
        2
      );
    }
  });
  return flatten(data);
}
