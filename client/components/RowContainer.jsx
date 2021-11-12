import React from 'react';
import Row from './TableRow'

export default ({ summaryData }) => {
  // generate array of Row components
  return Object.keys(summaryData).map(key => <Row rowData={summaryData[key]} rowClient={key} />)
}