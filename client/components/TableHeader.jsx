import React from 'react';

export default (props) => {
  return <tr>
    {props.headerData.map(data => <th className={data.replace(" ", "-").toLowerCase()}>{data}</th>)}
  </tr>;
}