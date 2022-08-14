import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { allTypesData } from "../../utils";
import "./financialstatement.css";

let Beginnigbalance = 28500;
function BalanceSheet() {
	const { documents, error } = useCollection("generalEntry");
	const [filterredAssets, setFilterredAssets] = useState([]);
	const [filterredLiabilityAndCapital, setFilterredLiabilityAndCapital] = useState([]);

	const { netTotal, assetsTotal, liabTotal, endingOwnerEquity, ownerWithDraw, ownerEquity, revTotal, expTotal, tbBalances } =
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
		<div style={{ display: "grid", gridTemplateColumns: "10fr 80fr 10fr" }}>
			<div></div>
			<div>
				<h1> Balance Sheet </h1>
				<div className="balanceSheetContainer">
					<TableContainer component={Paper}>
						{/* TABLE FOR ASSETS */}
						<Table sx={{ minWidth: 300 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell align="left">
										<h5>Assets</h5>
									</TableCell>
									<TableCell align="right">
										<h5> $ </h5>
									</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{filterredAssets.map((assetEntry) => (
									<TableRow>
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

					<TableContainer component={Paper}>
						{/* TABLE FOR ASSETS */}
						<Table sx={{ minWidth: 300 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell align="left">
										<h5>Liabilities</h5>
									</TableCell>
									<TableCell align="right">
										<h5> $ </h5>
									</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{filterredLiabilityAndCapital.map((assetEntry) => (
									<TableRow>
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
