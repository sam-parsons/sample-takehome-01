import React from 'react';

export default ({rowData}) => {
  return <tr>
    <td>{rowData.project}</td>
    <td>{rowData.client}</td>
    <td>{rowData.hours}</td>
    <td>{rowData.billableHours}</td>
    <td>{rowData.billableAmount}</td>
  </tr>
  
}