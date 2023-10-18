import React from 'react';
import './top_table.css'; // Import your CSS file for styling

//top table: basic wallet address information
//display wallet balance

const TopTable = ( {address, type, balance} ) => {
  return (
    <div className="table-container" id="top_table_id">
      <table className="curved-table">
        <tbody>
          <tr>
            <td className="black-cell">Address ID</td>
            <td style={{backgroundColor: "grey"}}>{address}</td>
          </tr>
          <tr >
            <td className="black-cell">Type</td>
            <td style={{backgroundColor: "#DDDDDD"}}>{type}</td>
          </tr>
          <tr >
            <td className="black-cell">ETH Balance</td>
            <td style={{backgroundColor: "#DDDDDD"}}>{balance}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TopTable;
