import React from 'react';
import Header from './TableHeader';
import Row from './TableRow'

export default ({ summaryData }) => {
  // get header data
  const headerData = ["Project", "Client", "Hours", "Billable Hours", "Billable Amount"];

  return <table>
    <Header headerData={headerData} />
    {summaryData  ? Object.keys(summaryData).map(key => <Row rowData={summaryData[key]} rowClient={key} />) : null}
  </table>;
}