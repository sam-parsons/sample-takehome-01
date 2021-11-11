import React from 'react';

export default ({rowData}) => {
  return <tr>
    <td className="project">{rowData.project}</td>
    <td className="client">{rowData.client}</td>
    <td className="hours">{rowData.hours}</td>
    <td className="billable-hours">{rowData.billableHours}</td>
    <td className="billable-amount">{rowData.billableAmount}</td>
  </tr>;
}