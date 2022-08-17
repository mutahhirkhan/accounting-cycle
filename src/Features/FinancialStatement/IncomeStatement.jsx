import React, { useEffect, useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { allTypesData } from "../../utils";
import { Table, Paper, TableBody, TableHead, TableContainer, TableCell, TableRow } from "@mui/material";
import "./financialstatement.css";

const IncomeStatement = () => {
	const { documents } = useCollection("generalEntry");
	const [filterredRevenues, setFilterredRevenues] = useState([]);
	const [filterredExpenses, setFilterredExpenses] = useState([]);

	const { netTotal, assetsTotal, liabTotal, endingOwnerEquity, ownerWithDraw, ownerEquity, revTotal, expTotal, tbBalances } =
		allTypesData(documents);

	useEffect(() => {
		let tempFilterredRevenues = [];
		let tempFilterredExpenses = [];

		Object.entries(tbBalances).forEach(([key, value]) => {
			if (value.type === "Revenue") {
				tempFilterredRevenues.push({
					...value,
					name: key,
				});
			}
		});

		Object.entries(tbBalances).filter(([key, value]) => {
			if (value.type === "Expense") {
				tempFilterredExpenses.push({
					...value,
					name: key,
				});
			}
		});

		setFilterredRevenues(tempFilterredRevenues);
		setFilterredExpenses(tempFilterredExpenses);
	}, [Object.keys(tbBalances).length]);

	const getNetIncomeOrNetLoss = () => {
		let netIncome = 0;
		filterredRevenues.forEach((item) => {
			netIncome += item.amount;
		});
		filterredExpenses.forEach((item) => {
			netIncome -= item.amount;
		});
		return netIncome;
	};

	return (
		<div className="div">
			<div></div>
			<div>
				<h1>Income Statement</h1>
				<TableContainer className="financial-container" component={Paper}>
					<Table className="financial-tables" sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="left">
									<h5> Revenues </h5>
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
							{filterredRevenues.map((revenue, i) => (
								<TableRow key={i + 1}>
									<TableCell align={`left`}>{revenue.name}</TableCell>
									{revenue.nature === "debit" ? <TableCell align="right">{revenue.amount}</TableCell> : <TableCell />}
									{revenue.nature === "credit" ? <TableCell align="right">{revenue.amount}</TableCell> : <TableCell />}
								</TableRow>
							))}
						</TableBody>
						<TableHead>
							<TableRow>
								<TableCell align="left">
									<h5> Expenses </h5>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filterredExpenses.map((revenue, i) => (
								<TableRow key={i + 1}>
									<TableCell align={`left `}>{revenue.name}</TableCell>
									{revenue.nature === "debit" ? <TableCell align="right">{revenue.amount}</TableCell> : <TableCell />}
									{revenue.nature === "credit" ? <TableCell align="right">{revenue.amount}</TableCell> : <TableCell />}
								</TableRow>
							))}
						</TableBody>
					</Table>
					<Table className="financial-tables" sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="left">
									<h5> {getNetIncomeOrNetLoss() > 0 || getNetIncomeOrNetLoss() === 0 ? "Net Income" : "Net Loss"} </h5>
								</TableCell>
								<TableCell align="right">
									<h5>{getNetIncomeOrNetLoss()}</h5>
								</TableCell>
							</TableRow>
						</TableHead>
					</Table>
				</TableContainer>
			</div>

			<div></div>
		</div>
	);
};

export default IncomeStatement;
