import React from 'react';
import round from './round';

export function formatBillableHours(hours, billableHours) {
  // need to handle if hours is zero so not to divide by zero
  if (billableHours === 0) billableHours = '0.00';

  return [
    <span className="billable-hour-amount">{billableHours}</span>,
    <span className="billable-hour-space"></span>,
    <div className="billable-hour-percentage">
      {'(' + round((billableHours / hours) * 100, 0) + '%' + ')'}
    </div>,
  ];
}

export function formatBillableAmount(amount) {
  if (amount === 0) return '--';

  return currencyFormatter.format(amount);
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
