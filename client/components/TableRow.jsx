import React from 'react';
import {formatBillableHours, formatBillableAmount} from '../util/formatValues'

export default ({rowData}) => {
  return <tr>
    <td className="project">{rowData.project}</td>
    <td className="client">{rowData.client}</td>
    <td className="hours">{rowData.hours}</td>
    <td className="billable-hours">{formatBillableHours(rowData.hours, rowData.billableHours)}</td>
    <td className="billable-amount">{formatBillableAmount(rowData.billableAmount)}</td>
  </tr>;
}