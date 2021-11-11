import React from 'react';

export default (props) => {
  return <tr>
    {props.headerData.map(data => <th>{data}</th>)}
  </tr>;
}