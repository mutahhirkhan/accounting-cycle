import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";
import { useCollection } from "../../hooks/useCollection";
import { allTypesData, useStyles } from "../../utils";

const getFilteredArray = (objectOfEntries, type) => {
  let filteredArray = [];
  Object.entries(objectOfEntries).forEach(([key, value]) => {
    if (value.type === type) {
      filteredArray.push({
        ...value,
        name: key,
      });
    }
  });
  return filteredArray;
};
const OwnerEquity = () => {
  const classes = useStyles();
  const { documents, error } = useCollection("generalEntry");
  const EquityAccounts = [];
  const [ownerEquityStatement, setOwnerEquityStatement] = useState([
    { name: "", value: 0 },
    // { netIncomeOrLoss: 0 },
    // { drawings: 0 },
    // { endingCapital: 0 },
  ]);

  const {
    netTotal,
    assetsTotal,
    liabTotal,
    endingOwnerEquity,
    ownerWithDraw,
    ownerEquity,
    revTotal,
    expTotal,
    tbBalances,
  } = allTypesData(documents);

  useEffect(() => {
    let tempFilterredRevenues = [];
    let tempFilterredExpenses = [];
    let tempFilterredWithdraws = [];
    let tempFilterredOwnerCapital = [];
    let netIncome = 0;
    let drawings = 0;
    let openingCapital = 0;
    let endingCapital = 0;

    tempFilterredRevenues = getFilteredArray(tbBalances, "Revenue");
    tempFilterredExpenses = getFilteredArray(tbBalances, "Expense");

    tempFilterredWithdraws = getFilteredArray(tbBalances, "Owner withdraw");
    tempFilterredOwnerCapital = getFilteredArray(tbBalances, "Owner Equity");

    // Object.entries(tbBalances).forEach(([key, value]) => {
    // 	if (value.type === "Revenue") {
    // 		tempFilterredRevenues.push({
    // 			...value,
    // 			name: key,
    // 		});
    // 	}
    // });

    // Object.entries(tbBalances).filter(([key, value]) => {
    // 	if (value.type === "Expense") {
    // 		tempFilterredExpenses.push({
    // 			...value,
    // 			name: key,
    // 		});
    // 	}
    // });

    // Object.entries(tbBalances).filter(([key, value]) => {
    // 	if (value.type === "Owner withdraw") {
    // 		tempFilterredWithdraws.push({
    // 			...value,
    // 			name: key,
    // 		});
    // 	}
    // });

    tempFilterredRevenues.forEach((item) => (netIncome += item.amount));
    tempFilterredExpenses.forEach((item) => (netIncome -= item.amount));

    tempFilterredWithdraws.forEach((item) => (drawings += item.amount));
    tempFilterredOwnerCapital.forEach(
      (item) => (openingCapital += item.amount)
    );

    setOwnerEquityStatement([
      { name: "Opening Capital", value: openingCapital },
      { name: "Net Income/Loss", value: netIncome },
      { name: "Drawings", value: drawings },
      { name: "Ending Capital", value: openingCapital + netIncome - drawings },
    ]);
  }, [Object.keys(tbBalances).length]);

  return (
    <div className="div">
      {console.log(ownerEquityStatement)}
      <div></div>
      <div>
        <h1> Statement Of Owner's Equity </h1>

        <TableContainer className="financial-container" component={Paper}>
          {/* TABLE FOR ASSETS */}
          <Table
            className="financial-tables"
            sx={{ minWidth: 300 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow className={classes.root}>
                <TableCell align="left">
                  <h5> Account Name </h5>
                </TableCell>
                <TableCell align="right">
                  <h5> $ </h5>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {ownerEquityStatement.map((equityItem) => (
                <TableRow>
                  <TableCell align={"left"}>{`${equityItem.name}`}</TableCell>
                  <TableCell align={"right"}>{`${equityItem.value}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default OwnerEquity;
