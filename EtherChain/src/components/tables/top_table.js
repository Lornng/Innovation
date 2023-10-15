import React from 'react';
import './top_table.css'; // Import your CSS file for styling


const TableComponent = () => {
  return (
    <div className="table-container" id="top_table_id">
      <table className="curved-table">
        <tbody>
          <tr>
            <td className="black-cell">Wallet Address</td>
            <td style={{backgroundColor: "grey"}}>asdfsfasdfsdfasdf</td>
          </tr>
          <tr >
            <td className="black-cell">Balance</td>
            <td style={{backgroundColor: "#DDDDDD"}}>USD 10000000</td>
          </tr>
          <tr>
            <td className="black-cell">Tokens Holdings</td>
            <td style={{backgroundColor: "grey"}}>0.000001 ETH</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;
