import React from 'react';

function formatHeaderClass(header) {
  return header.replace(" ", "-").toLowerCase();
}

export default (props) => {
  return (
    <tr>
      {
        // generate array of th elements
        props.headers.map(header => <th className={formatHeaderClass(header)}>{header}</th>)
      }
    </tr>
  ) ;
}