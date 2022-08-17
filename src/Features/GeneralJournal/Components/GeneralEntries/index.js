/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from "react";
import { useCollection } from "../../../../hooks/useCollection";
import "./generalentries.css";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "../../../FinancialStatement/financialstatement.css";

function GeneralEntries() {
  const getInnerCompoundEntries = (batchEntry) => {
    console.log("entry", batchEntry)
    let filterredFromGarbage = [];
    let generalEntriesArray = [];
    let validLength = 0;

    Object.entries(batchEntry).forEach(([key, value]) => {
      //this check maintains, if the current entry's key is a number, not createdAt or id
      //that is why, we can use this
      if (key == validLength) {
        validLength++;
        filterredFromGarbage.push(value);
      }
    });

    filterredFromGarbage.forEach((entry) => {
      generalEntriesArray.push(<TableCell>{`${entry.creditInfo}`}</TableCell>);
    });

    return generalEntriesArray;
  };

  const getInnerCompoundEntriesdebit = (batchEntry, type) => {
    console.log("entry", batchEntry)
    let filterredFromGarbage = [];
    let generalEntriesArray = [];
    let validLength = 0;

    Object.entries(batchEntry).forEach(([key, value]) => {
      //this check maintains, if the current entry's key is a number, not createdAt or id
      //that is why, we can use this
      if (key == validLength) {
        validLength++;
        filterredFromGarbage.push(value);
      }
    });

    filterredFromGarbage.forEach((entry) => {
      if (type === 'debit') {
        generalEntriesArray.push(entry.debit ? <div>{`${entry.debit}`}</div> : <div />);
      }
      else {
        generalEntriesArray.push(entry.credit ? <div>{`${entry.credit}`}</div> : <div />);
      }
    });

    return generalEntriesArray;
  };

  const { documents, error } = useCollection("generalEntry");

  return (
    <div className="div">
      <div></div>
      <div>
        <h1>General Entries</h1>
        <TableContainer className="financial-container" component={Paper}>
          <Table className="financial-tables" sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <h5>Date</h5>
                </TableCell>
                <TableCell>
                  <h5>Description</h5>
                </TableCell>
                <TableCell>
                  <h5>Debit</h5>
                </TableCell>
                <TableCell>
                  <h5>Credit</h5>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents &&
                documents.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{moment(entry.createdAt.toDate().toString()).format("Do MMM YY")}</TableCell>
                    {
                      <div className="flexing-description">
                        {getInnerCompoundEntries(entry)}
                      </div>
                    }
                    {/* this debit and credit info has to be merged with description info  */}
                    {
                      <TableCell>
                        {getInnerCompoundEntriesdebit(entry, 'debit')}
                      </TableCell>
                    }
                    {
                      <TableCell>
                        {getInnerCompoundEntriesdebit(entry, 'credit')}
                      </TableCell>
                    }
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div></div>
    </div>
  );
}

export default GeneralEntries;
