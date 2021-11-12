import React from 'react';
import Header from './TableHeader';
import RowContainer from './RowContainer'

export default ({ summaryData }) => {
  const headers = ["Project", "Client", "Hours", "Billable Hours", "Billable Amount"];

  return (
    <table>
      <tbody>
        <Header headers={headers} />
        {
          summaryData ? 
          <RowContainer summaryData={summaryData} />
          : null
        }
      </tbody>
    </table>
  );  
}