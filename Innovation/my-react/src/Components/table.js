import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './table.css'
import { forceCenter } from 'd3';

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function SpanningTable() {  
  return (
    React.createElement(TableContainer , {sx: {backgroundColor: "#1A2337", margin: "100px", boxShadow: "none"}, component: Paper},
      React.createElement(Table, { sx: {width: 1000, backgroundColor: "#D9D9D9", margin: "auto", borderRadius: "10px"}, 'aria-label': 'spanning table'},
        React.createElement(TableHead, null,
          React.createElement(TableRow, null,
            React.createElement(TableCell, { align: 'center', colSpan: 3}, 'Details'),
            React.createElement(TableCell, { align: 'right' }, 'Price')
          ),
          React.createElement(TableRow, {sx: {backgroundColor: "white"}},
            React.createElement(TableCell, null, 'Desc'),
            React.createElement(TableCell, { align: 'right' }, 'Qty.'),
            React.createElement(TableCell, { align: 'right' }, 'Unit'),
            React.createElement(TableCell, { align: 'right' }, 'Sum')
          )
        ),
        React.createElement(TableBody, {sx: {backgroundColor: "white", borderTop: "none", borderRadius: "10px"}},
          rows.map((row) => (
            React.createElement(TableRow, { key: row.desc },
              React.createElement(TableCell, null, row.desc),
              React.createElement(TableCell, { align: 'right' }, row.qty),
              React.createElement(TableCell, { align: 'right' }, row.unit),
              React.createElement(TableCell, { align: 'right' }, ccyFormat(row.price))
            )
          )),
          React.createElement(TableRow, null,
            React.createElement(TableCell, { rowSpan: 3 }),
            React.createElement(TableCell, { colSpan: 2 }, 'Subtotal'),
            React.createElement(TableCell, { align: 'right' }, ccyFormat(invoiceSubtotal))
          ),
          React.createElement(TableRow, {sx: {backgroundColor: "gray"}},
            React.createElement(TableCell, null, 'Tax'),
            React.createElement(TableCell, { align: 'right' }, `${(TAX_RATE * 100).toFixed(0)} %`),
            React.createElement(TableCell, { align: 'right' }, ccyFormat(invoiceTaxes))
          ),
          React.createElement(TableRow, null,
            React.createElement(TableCell, { colSpan: 2 }, 'Total'),
            React.createElement(TableCell, { align: 'right' }, ccyFormat(invoiceTotal))
          )
        )
      )
    )    
  );
}
