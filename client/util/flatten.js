export default function flatten(summaryData) {
  const resultArr = [];
  Object.keys(summaryData).forEach((client) => {
    Object.keys(summaryData[client]).forEach((project) => {
      resultArr.push({
        client: client,
        project: project,
        hours: summaryData[client][project].hours,
        billableHours: summaryData[client][project].billableHours,
        billableAmount: summaryData[client][project].billableAmount,
      });
    });
  });
  return resultArr;
}
