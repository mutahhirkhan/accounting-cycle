import { makeStyles } from "@material-ui/core";
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useStyles } from "../../utils";
import { allTypesData } from "../../utils";
import "./FinancialStatement.css";

let Beginnigbalance = 28500;
function BalanceSheet() {
	const classes=useStyles()
	const { documents, error } = useCollection("generalEntry");
	const [filterredAssets, setFilterredAssets] = useState([]);
	const [filterredLiabilityAndCapital, setFilterredLiabilityAndCapital] = useState([]);

	const {tbBalances } =
		allTypesData(documents);

	useEffect(() => {
		let tempFilterredAssets = [];
		Object.entries(tbBalances).forEach((entry) => {
			if (entry?.[1].type == "Asset") {
				tempFilterredAssets.push({
					...entry[1],
					name: entry[0],
				});
			}
		});

		let tempFilterredLiabilityAndCapital = [];
		Object.entries(tbBalances).filter((entry) => {
			if (entry?.[1].type == "Liability" || entry?.[1].type == "Owner Equity") {
				tempFilterredLiabilityAndCapital.push({
					...entry[1],
					name: entry[0],
				});
			}
		});
		setFilterredAssets(tempFilterredAssets);
		setFilterredLiabilityAndCapital(tempFilterredLiabilityAndCapital);

		// console.log("assets", tempFilterredAssets);
		// console.log("liabilit and cap", tempFilterredLiabilityAndCapital);
	}, [Object.keys(tbBalances).length]);

	function getTotalofAssets(assetArray) {
		let total = 0;
		assetArray.forEach((item) => {
			if (item.nature === "debit") total += item.amount;
			else total -= item.amount;
		});
		return total;
	}

	function getTotalofLiabilitiesAndCapital(assetArray) {
		let total = 0;
		assetArray.forEach((item) => {
			if (item.nature === "credit") total += item.amount;
			else total -= item.amount;
		});
		return total;
	}

	return (
		<div style={{ display: "grid", gridTemplateColumns: "8fr 84fr 8fr" }}>
			<div></div>
			<div>
				<h1> Balance Sheet </h1>
				<div className="balance-sheet-container">
					<TableContainer className="financial-container" component={Paper}>
						{/* TABLE FOR ASSETS */}
						<Table className="financial-tables" sx={{ minWidth: 300 }} aria-label="simple table">
							<TableHead>
								<TableRow className={classes.root}>
									<TableCell align="left">
										<h5>Assets</h5>
									</TableCell>
									<TableCell align="right">
										<h5> $ </h5>
									</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{filterredAssets.map((assetEntry, index) => (
									<TableRow key={index+1}>
										{/* for assets */}
										<TableCell align={"left"}>{`${assetEntry.name}`}</TableCell>
										<TableCell align={"right"}>
											{assetEntry.nature === "credit" ? `( ${assetEntry.amount} )` : assetEntry.amount}
										</TableCell>
									</TableRow>
								))}

								<TableRow>
									<TableCell align={"left"}>
										{" "}
										<h4>Total</h4>
									</TableCell>
									<TableCell align={"right"}>{getTotalofAssets(filterredAssets)}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>

					<TableContainer className="financial-container" component={Paper}>
						{/* TABLE FOR ASSETS */}
						<Table className="financial-tables" sx={{ minWidth: 300 }} aria-label="simple table">
							<TableHead>
								<TableRow className={classes.root}>
									<TableCell align="left">
										<h5>Liabilities</h5>
									</TableCell>
									<TableCell align="right">
										<h5> $ </h5>
									</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{filterredLiabilityAndCapital.map((assetEntry, index) => (
									<TableRow key={index+1}>
										{/* for assets */}
										<TableCell align={"left"}>{`${assetEntry.name}`}</TableCell>
										<TableCell align={"right"}>
											{assetEntry.nature === "debit" ? `( ${assetEntry.amount} )` : assetEntry.amount}
										</TableCell>
									</TableRow>
								))}

								<TableRow>
									<TableCell align={"left"}>
										{" "}
										<h4>Total</h4>{" "}
									</TableCell>
									<TableCell align={"right"}>{getTotalofLiabilitiesAndCapital(filterredLiabilityAndCapital)}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</div>

				<div></div>
			</div>
		</div>
	);
}

export default BalanceSheet;
