import React from 'react';
import Header from './Header';
import RowContainer from './RowContainer'

export default ({ summaryData }) => {
  const headers = ["Project", "Client", "Hours", "Billable Hours", "Billable Amount"];

  return (
    <table>
      <tbody>
        <Header headers={headers} />
        <RowContainer summaryData={summaryData} />
      </tbody>
    </table>
  );  
}