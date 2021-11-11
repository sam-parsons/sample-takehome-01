import React from 'react';
import Header from './TableHeader';
import Row from './TableRow'

export default ({ summaryData }) => {
  const headers = ["Project", "Client", "Hours", "Billable Hours", "Billable Amount"];

  return <table>
    <Header headers={headers} />
    {summaryData  ? Object.keys(summaryData).map(key => <Row rowData={summaryData[key]} rowClient={key} />) : null}
  </table>;
}