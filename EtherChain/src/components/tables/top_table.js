// import React from 'react';
// import './top_table.css'; // Import your CSS file for styling


// const TableComponent = () => {
//   return (
//     <div className="table-container" id="top_table_id">
//       <table className="curved-table">
//         <tbody>
//           <tr>
//             <td className="black-cell">Wallet Address</td>
//             <td style={{backgroundColor: "grey"}}>asdfsfasdfsdfasdf</td>
//           </tr>
//           <tr >
//             <td className="black-cell">Balance</td>
//             <td style={{backgroundColor: "#DDDDDD"}}>USD 10000000</td>
//           </tr>
//           <tr>
//             <td className="black-cell">Tokens Holdings</td>
//             <td style={{backgroundColor: "grey"}}>0.000001 ETH</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default TableComponent;


import React from 'react';
import './top_table.css'; // Import your CSS file for styling

//top table: basic wallet address information

const TopTable = ( {address, type} ) => {
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
        </tbody>
      </table>
    </div>
  );
}

export default TopTable;