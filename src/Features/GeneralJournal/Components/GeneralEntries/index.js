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
import { useStyles } from "../../../../utils";

function GeneralEntries() {
  const classes = useStyles();

  const getInnerCompoundEntries = (batchEntry) => {
    // console.log("entry", batchEntry);
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

    filterredFromGarbage.forEach((entry, index) => {
      generalEntriesArray.push(<TableCell key={index+index+index+1}>{`${entry.creditInfo}`}</TableCell>);
    });

    return generalEntriesArray;
  };

  const getInnerCompoundEntriesdebit = (batchEntry, type) => {
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
    filterredFromGarbage.forEach((entry, index) => {
      generalEntriesArray.push(<TableCell key={index+index+1}>{`${entry[type] ? entry[type] : "-"}`}</TableCell>);
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
              <TableRow className={classes.root}>
                <TableCell><h5>Date</h5></TableCell>
                <TableCell><h5>Description</h5></TableCell>
                <TableCell><h5>Debit</h5></TableCell>
                <TableCell><h5>Credit</h5></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents &&
                documents.map((entry, index) => (
                  <TableRow key={index+1}>
                    <TableCell>{moment(entry.createdAt.toDate().toString()).format("Do MMM YY")}</TableCell>
                    {
                      <TableCell className="remove-padding">
                        <div className="flexing-description">{getInnerCompoundEntries(entry)}</div>
                      </TableCell>
                    }
                    {/* this debit and credit info has to be merged with description info  */}
                    {
                      <TableCell className="remove-padding">
                        <div className="flexing-description">
                          {getInnerCompoundEntriesdebit(entry, "debit")}
                        </div>
                      </TableCell>
                    }
                    {
                      <TableCell className="remove-padding">
                        <div className="flexing-description">
                          {getInnerCompoundEntriesdebit(entry, "credit")}
                        </div>
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
