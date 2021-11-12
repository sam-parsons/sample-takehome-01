import React from 'react';
import round from './round';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatBillableHours(hours, billableHours) {
  if (billableHours === 0 || hours === 0) billableHours = '0.00';
  const percentage = hours === 0 ? 0 : (billableHours / hours) * 100;

  return [
    <span className="billable-hour-amount">{billableHours}</span>,
    <span className="billable-hour-space"></span>,
    <div className="billable-hour-percentage">
      {'(' + round(percentage, 0) + '%' + ')'}
    </div>,
  ];
}

export function formatBillableAmount(amount) {
  if (amount === 0) return '--';

  return currencyFormatter.format(amount);
}
