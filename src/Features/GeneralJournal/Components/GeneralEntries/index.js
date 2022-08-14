/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useCollection } from '../../../../hooks/useCollection'
import './generalentries.css';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "../../../FinancialStatement/financialstatement.css"

function GeneralEntries() {

  const { documents, error } = useCollection("generalEntry");
  console.log(documents)
  return (
    <div className='div'>
      <div></div>
      <div>
        <h1>General Entries</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><h5>Date</h5></TableCell>
                <TableCell align="right"><h5>Description</h5></TableCell>
                <TableCell align="right"><h5>Debit</h5></TableCell>
                <TableCell align="right"><h5>Credit</h5></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                documents && documents.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{moment(entry.createdAt.toDate().toString()).format('Do MMM YY')}</TableCell>
                    <TableCell>{moment(entry.createdAt.toDate().toString()).format('Do MMM YY')}</TableCell>
                    <TableCell>{moment(entry.createdAt.toDate().toString()).format('Do MMM YY')}</TableCell>
                    <TableCell>{moment(entry.createdAt.toDate().toString()).format('Do MMM YY')}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div></div>
    </div>
  );
}

export default GeneralEntries;
