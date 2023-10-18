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

//fields of data available: from_address,to_address,hash,value,input,transaction_index,gas,gas_used,gas_price,transaction_fee,block_number,block_hash,block_timestamp
function createData(record) {
    return {
      transaction_index: record.relationship.transaction_index,
      hash: {
        truncated: record.relationship.hash.length > 10
          ? record.relationship.hash.slice(0, 4) + "...." + record.relationship.hash.slice(-7)
          : record.relationship.hash,
        full: record.relationship.hash,
      },
      from_address: {
        truncated: record.from.addressId.length > 10
          ? record.from.addressId.slice(0, 4) + "...." + record.from.addressId.slice(-7)
          : record.from.addressId,
        full: record.from.addressId,
      },
      to_address: {
        truncated: record.to.addressId.length > 10
          ? record.to.addressId.slice(0, 4) + "...." + record.to.addressId.slice(-7)
          : record.to.addressId,
        full: record.to.addressId,
      },
      transaction_fee: record.relationship.transaction_fee,
      value: record.relationship.value,
      input: {
        truncated: record.relationship.input.length > 10
          ? record.relationship.input.slice(0, 4) + "...." + record.relationship.input.slice(-7)
          : record.relationship.input,
        full: record.relationship.input,
      },
      gas: record.relationship.gas,
      gas_used: record.relationship.gas_used,
      gas_price: record.relationship.gas_price,
      block_number: record.relationship.block_number,
      block_hash: record.relationship.block_hash,
      block_timestamp: record.relationship.block_timestamp,
    }
}

//table HeaderCellStyle
const tableHeaderCellStyle = {
  fontSize: '16px',
  backgroundColor: 'black',
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
};


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
        {row.transaction_index}
        </TableCell>
        <TableCell title={row.hash.full}>{row.hash.truncated}</TableCell>
        <TableCell title={row.from_address.full}>{row.from_address.truncated}</TableCell>
        <TableCell title={row.from_address.full}>{row.to_address.truncated}</TableCell>
        <TableCell>{row.transaction_fee}</TableCell>
        <TableCell>{row.value}</TableCell>
      </TableRow>
{/* the expanded table */}
<TableRow>
        <TableCell sx={{ backgroundColor: 'white' }} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography fontWeight="bold" variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Typography fontSize="14px" gutterBottom component="div">
                <span style={{ fontWeight: 'bold' }}>Transaction Hash: </span>
                <span className="transaction-hash">{row.hash.full}</span>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'white' }}>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Input</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Gas</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Gas Used</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Gas Price</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Block Number</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Block Hash</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Block Timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell title={row.input.full} >{row.input.truncated}</TableCell>
                    <TableCell>{row.gas}</TableCell>
                    <TableCell>{row.gas_used}</TableCell>
                    <TableCell>{row.gas_price}</TableCell>
                    <TableCell>{row.block_number}</TableCell>
                    <TableCell>{row.block_hash}</TableCell>
                    <TableCell>{row.block_timestamp}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

//this is for the collapsible table's design
function CollapsibleTable({ data }) {
  if (!data || data.length === 0) {
    return null;
  }
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
                <TableCell sx={tableHeaderCellStyle}>Transaction Index</TableCell>
                <TableCell sx={tableHeaderCellStyle}>Transaction Hash</TableCell>
                <TableCell sx={tableHeaderCellStyle}>From Address</TableCell>
                <TableCell sx={tableHeaderCellStyle}>To Address</TableCell>
                <TableCell sx={tableHeaderCellStyle}>Transaction Fee</TableCell>
                <TableCell sx={tableHeaderCellStyle}>Transaction Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <Row key={index} row={createData(row)} />
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
