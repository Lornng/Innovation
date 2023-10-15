import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import "./bot_table.css";
import VizButton from './viz_button';


function createData(transactions, original, end, status, price) {

  return {
    transactions: {
      truncated: transactions.length > 10
        ? transactions.slice(0, 4) + "...." + transactions.slice(-7)
        : transactions,
      full: transactions,
    },
    original,
    end,
    status,
    price,
    history: [
      {
        date: '2020-01-05',
        walletaddress: 'asdfsfasdfsdfasdf',
        amount: 3,
        inflow: 4,
      },
      {
        date: '2020-01-02',
        walletaddress: 'Anonymous',
        amount: 1,
        outflow: 2,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.transactions.truncated}
        </TableCell>
        <TableCell align="center">{row.original}</TableCell>
        <TableCell align="center">{row.end}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell align="center">{row.price}</TableCell>
      </TableRow>
{/* the expanded table */}
      <TableRow>
        <TableCell sx={{ backgroundColor: 'white' }} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography fontWeight="bold" variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Typography fontSize="14px" gutterBottom component="div">
                  <span style={{ fontWeight: 'bold' }}>Transaction Hash: </span> 
                  <span className="transaction-hash">{row.transactions.full}</span>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'white' }}>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Wallet Address</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Tokens</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Inflow($)</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Outflow($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.walletaddress}</TableCell>
                      <TableCell align="center">{historyRow.amount}</TableCell>
                      <TableCell align="center">
                        {historyRow.inflow && historyRow.inflow >0 ? (
                          <>
                          {historyRow.inflow}&nbsp;(${Math.round(historyRow.inflow * row.price * 100) / 100})
                          </>
                        ): (
                          "-"
                        )}
                        </TableCell>
                      <TableCell align="center">
                        {historyRow.outflow && historyRow.outflow >0 ? (
                          <>
                          {historyRow.outflow}&nbsp;(${Math.round(historyRow.outflow * row.price * 100) / 100})
                          </>
                        ): (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('0x51d370f70627e6e59b733b076e77d3e8c363ab0774b8bd702eaf297bfdf6af79', 'asdfsfasdfsdfasdf', "asdiurjnfgehh44", 'Succesful', 33.7),
  createData('0xk37ee64365b3bf00de7f8fee7845fe2c1916312975d73bbc6a83a38292d54d0b', 'asdfsfasdfsdfasdf', "asdiurjnfgehh44", 'Succesful', 20),
  createData('0x8fd370f70627e6e59b733b076e77d3e8c363ab0774b8bd702eaf297efdr6a81j', 'asdfsfasdfsdfasdf', "asdiurjnfgehh44", 'Failed', 50),
  createData('0x40d370f70627e6e59b733b06f7123e86c363ab0774b8bd702eaf297bfdf6aaaj', 'asdfsfasdfsdfasdf', "asdiurjnfgehh44", 'Succesful', 88),
  createData('0x35d370f70627e6e59b733b076e77d3e8c363ab0774b8bd702eaf297bfdf6af79', 'asdfsfasdfsdfasdf', "asdiurjnfgehh44", 'Failed', 27.5),
];

//this is for the collapsible table's design
function CollapsibleTable() {
//Define the header table
  const tableHeaderCellStyle = {
    fontSize: '16px',
    backgroundColor: 'black',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  };

  return (
    <div>
      <div 
      style={{
        overflow: 'auto', 
        borderRadius: '13px', 
        position: 'relative'
        }}
        className="bottableContainer"
      >
        <TableContainer component={Paper} >
          <Table
            size="medium"
            sx={{width: '100%', backgroundColor: '#DDDDDD', fontSize: '18px'}}
            aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeaderCellStyle} />
                <TableCell sx={tableHeaderCellStyle}>Transaction Hash</TableCell>
                <TableCell sx={tableHeaderCellStyle}>From</TableCell>
                <TableCell sx={tableHeaderCellStyle}>To</TableCell>
                <TableCell sx={tableHeaderCellStyle}>Status</TableCell>
                <TableCell sx={tableHeaderCellStyle}>Price(ETH)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.transactions.truncated} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className='viz_button_container'>
        <VizButton/>
      </div>
    </div>
  );
}

export default CollapsibleTable;
