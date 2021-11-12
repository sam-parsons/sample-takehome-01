import React from 'react';

function formatHeaderClass(header) {
  return header.replace(" ", "-").toLowerCase();
}

export default (props) => {
  return (
    <tr>
      {
        // generate array of th elements
        props.headers.map((header, i) => {
          return (
            <th className={formatHeaderClass(header)} 
              key={"th" + i}>
              {header}
            </th>
          ) 
        })
      }
    </tr>
  ) ;
}