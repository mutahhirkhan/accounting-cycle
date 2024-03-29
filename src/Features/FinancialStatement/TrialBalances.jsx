import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { allTypesData, useStyles } from "../../utils";
import "./FinancialStatement.css";

function TrialBalances() {
	const classes=useStyles()
	const { documents, error } = useCollection("generalEntry");

	const [debitAndCreditTotal, setDebitAndCreditTotal] = useState({
		debits: 0,
		credits: 0,
	});

	const { tbBalances } = allTypesData(documents);

	// let flag = 0;
	// // console.log(assetsTotal ,liabTotal , endingOwnerEquity , ownerEquity);
	// if (assetsTotal == liabTotal + endingOwnerEquity + ownerEquity) {
	// 	//if balance is equal
	// 	flag = 1;
	// }
	// const newownerequity = Beginnigbalance + netTotal - ownerWithDraw;
	// /// NOTICE
	// // const oc = newownerequity - Beginnigbalance + Beginnigbalance;
	// const oc = newownerequity;

	useEffect(() => {
		Object.keys(tbBalances).length > 0 && calculateDebitAndCreditForTbBalances(tbBalances);
	}, [Object.keys(tbBalances).length]);

	const calculateDebitAndCreditForTbBalances = (tbBalances) => {
		let debits = 0;
		let credits = 0;
		Object.entries(tbBalances).forEach((entry) =>
			entry?.[1].nature == "debit" ? (debits += entry?.[1].amount) : (credits += entry?.[1].amount)
		);
		setDebitAndCreditTotal({ debits, credits });
	};

	
	return (
		<div className="div">
			<div></div>
			<div>
				<h1>Adjusted Trial Balance</h1>
				<TableContainer className="financial-container" component={Paper}>
					<Table className="financial-tables" sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow className={classes.root}>
								<TableCell align="left">
									<h5>Accounts name</h5>
								</TableCell>
								<TableCell align="right">
									<h5>Debit</h5>
								</TableCell>
								<TableCell align="right">
									<h5>Credit</h5>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{Object.entries(tbBalances).map(([key, value], i) => (
								<TableRow key={i + 1}>
									<TableCell align={`${value.nature === "credit" ? "right" : "left"}`}>{key}</TableCell>
									{value.nature === "debit" ? <TableCell align="right">{value.amount}</TableCell> : <TableCell />}
									{value.nature === "credit" ? <TableCell align="right">{value.amount}</TableCell> : <TableCell />}
								</TableRow>
							))}
							<TableRow>
								<TableCell align="left">
									<h4>Total</h4>
								</TableCell>
								<TableCell align="right">{debitAndCreditTotal.debits}</TableCell>
								<TableCell align="right">{debitAndCreditTotal.credits}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>

			<div></div>
		</div>
	);
}

export default TrialBalances;
