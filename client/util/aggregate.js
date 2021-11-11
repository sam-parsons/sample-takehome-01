import round from './round';

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
  return data;
}
