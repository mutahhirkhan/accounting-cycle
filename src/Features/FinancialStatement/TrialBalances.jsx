import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { allTypesData } from "../../utils";
import "./financialstatement.css";

let Beginnigbalance = 28500;
function TrialBalances() {
	const { documents, error } = useCollection("generalEntry");

	const [debitAndCreditTotal, setDebitAndCreditTotal] = useState({
		debit: 0,
		credit: 0,
	});

	const { netTotal, assetsTotal, liabTotal, endingOwnerEquity, ownerWithDraw, ownerEquity, revTotal, expTotal, tbBalances } =
		allTypesData(documents);

	let flag = 0;
	// console.log(assetsTotal ,liabTotal , endingOwnerEquity , ownerEquity);
	if (assetsTotal == liabTotal + endingOwnerEquity + ownerEquity) {
		//if balance is equal
		flag = 1;
	}
	const newownerequity = Beginnigbalance + netTotal - ownerWithDraw;
	/// NOTICE
	// const oc = newownerequity - Beginnigbalance + Beginnigbalance;
	const oc = newownerequity;

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
		<div style={{ display: "grid", gridTemplateColumns: "10fr 80fr 10fr" }}>
			<div></div>
			<div>
				<h1>Adjusted Trial Balance</h1>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
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
							{Object.entries(tbBalances).map((entry, i) => (
								<TableRow key={i + 1}>
									<TableCell align={`${entry[1].nature === "credit" ? "right" : "left"}`}>{entry[0]}</TableCell>
									{entry[1].nature === "debit" ? <TableCell align="right">{entry[1].amount}</TableCell> : <TableCell />}
									{entry[1].nature === "credit" ? <TableCell align="right">{entry[1].amount}</TableCell> : <TableCell />}
								</TableRow>
							))}
							<TableRow>
								<TableCell align="left">
									<h4>Total</h4>
								</TableCell>
								<TableCell align="right">2000</TableCell>
								<TableCell align="right">3000</TableCell>
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
