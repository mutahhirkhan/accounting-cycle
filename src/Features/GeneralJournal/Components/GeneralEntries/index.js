/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import LoadingSpinner from '../../../../Components/UI/LoadingSpinner';
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


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("22Aug", "Cash", 1000, 2000, 4.0),
  createData("22Aug", "Cash", 1000, 2000, 4.0),
  createData("22Aug", "Cash", 1000, 2000, 4.0),
  createData("22Aug", "Cash", 1000, 2000, 4.0),
];
function GeneralEntries() {

  const { documents, error } = useCollection("generalEntry");
  console.log("general entries",documents)
  const renderGeneralEnrties = () => {
    return documents && documents.map((arr, index) => {
      const { typeA, debitInfo, debit, } = arr[0];
      const { typeB, creditInfo, credit, } = arr[1];
      const date = moment(arr.createdAt.toDate().toString()).format('Do MMM YY');
      const id = arr.id;
      return (
        <div className='entry' >
          <h6>{id}</h6>
          <h6>{date}</h6>
          <h6>{debitInfo}=("{typeA}"")</h6>
          <h6>{creditInfo}=("{typeB}")</h6>
          <h6>{debit}</h6>
          <h6>{credit}</h6>
        </div>
      )
    })
  };

  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Debit</TableCell>
            <TableCell align="right">Credit</TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 2 } }}
            >
              <TableCell align="left">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    // <div className='general-entry-container'>
    //   <h3>General Entries</h3>
    //   <div className='entry ' id='fixedheadings'>
    //     <h6>ID</h6>
    //     <h6>Date</h6>
    //     <h6>Debit Account Name</h6>
    //     <h6>Credit Account Name</h6>
    //     <h6>Debit Amount</h6>
    //     <h6>Credit Amount</h6>

    //   </div>
    //   {
    //     renderGeneralEnrties()
    //   }

    // </div>

  );
}

export default GeneralEntries;
