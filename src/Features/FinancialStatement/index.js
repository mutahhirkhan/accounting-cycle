/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./financialstatement.css";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { type } from "@testing-library/user-event/dist/type";
import { FormModal } from "../GeneralJournal/Components/FormModal/index";
import { GeneralEntries } from "../GeneralJournal/Components/GeneralEntries/generalentries.css";
let Beginnigbalance = 28500;

function FinancialStatementMainComponent() {
	const { documents, error } = useCollection("generalEntry");
	//  console.log("firebase documents",documents)
	const { dispatch, rev, exp, netInc } = useAuthContext();

	const allTypesData = () => {
		let revTotal = 0;
		let expTotal = 0;
		let netTotal = 0;
		let ownerWithDraw = 0;
		let assetsTotal = 0;
		let liabTotal = 0;
		let ownerEquity = 0;
		let endingOwnerEquity = 0;
		
      // let counter = 0;
      // let flag = false;
		documents &&
			documents.map( arr => {
            for(let i=0; i < Object.keys(arr).length ; i++){
               // counter++;
               const { typeA, debit, typeB, credit } = arr[i] || {}; //type and amount
               
               if (typeA == "Expense") expTotal += Number(debit);
               else if (typeA == "Owner withdraw") ownerWithDraw += Number(debit);
               else if (typeA == "Revenue") revTotal -= Number(debit);
               else if (typeA == "Asset") assetsTotal += Number(debit);
               else if (typeA == "Liability") liabTotal -= Number(debit);
               
               else if (typeB == "Revenue") revTotal += Number(credit);
               else if (typeB == "Owner Equity") ownerEquity += Number(credit);
               else if (typeB == "Asset") assetsTotal -= Number(credit);
               else if (typeB == "Liability") liabTotal += Number(credit);
            }
			});
		console.log("======");
      // if(!flag){
      //    console.log('counter',counter); flag = !flag
      // }  
		netTotal = revTotal - expTotal;
		endingOwnerEquity = netTotal - ownerWithDraw;

		// console.log(assetsTotal,liabTotal);
		return {
			revTotal,
			expTotal,
			netTotal,
			ownerWithDraw,
			assetsTotal,
			liabTotal,
			ownerEquity,
			endingOwnerEquity,
		};
	};

	const generateIncomeStatement = () => {
		const { revTotal, expTotal, netTotal } = allTypesData();

		return (
			<div className="income-statement">
				<h1>Income statement</h1>
				<div className="rev-exp">
					<div>Revenue = {revTotal}</div>
					<div>Expense = {expTotal}</div>
				</div>
				<br></br>

				<span className="net-inc">Net Income = "{netTotal}"</span>
			</div>
		);
	};
	const closing = () => {
		const { revTotal, expTotal, netTotal, ownerWithDraw, ownerEquity } = allTypesData();
		let incomesummary = 0;
		const newownerequity = Beginnigbalance + netTotal - ownerWithDraw;

		incomesummary = revTotal - expTotal;

		return (
			<div className="income-statement">
				<h1>Closing Accounts</h1>
				<div className="rev-exp">
					<div>Revenue = {revTotal}</div>
					<div>Expense = {expTotal}</div>
				</div>
				<br></br>

				<span className="net-inc">incomesummary = {incomesummary}</span>
				<span className="net-inc">After Closing Owner Equity = {newownerequity}</span>
			</div>
		);
	};

	const generateOwnetEquityStatement = () => {
		const { netTotal, ownerWithDraw, ownerEquity } = allTypesData();
		const newownerequity = Beginnigbalance + netTotal - ownerWithDraw;

		const oc = newownerequity - Beginnigbalance + Beginnigbalance;

		return (
			<div className="owner-equity-statement">
				<h1>Owner Equity statement</h1>
				<div className="OE-entries">
					<h4>Beginnig Balance of OE: {Beginnigbalance}</h4>
					<h4>Less Owner withdraw: {ownerWithDraw}</h4>
					<h4>Add Net Income: {netTotal}</h4>
					<h4>Ending Balance of OE: {newownerequity}</h4>
				</div>
			</div>
		);
	};

	const balanceSheetStatement = () => {
		const { netTotal, assetsTotal, liabTotal, endingOwnerEquity, ownerWithDraw, ownerEquity, revTotal, expTotal } = allTypesData();

		let flag = 0;
		if (assetsTotal == liabTotal + endingOwnerEquity + ownerEquity) {
			//if balance is equal
			flag = 1;
		}
		const newownerequity = Beginnigbalance + netTotal - ownerWithDraw;
		const oc = newownerequity - Beginnigbalance + Beginnigbalance;

		return (
			<>
				<h1>Balance Sheet statement</h1>
				<div className="balance-sheet">
					<div className="asset-col">
						<h2>Assets</h2>
						<h3>Total = {assetsTotal}</h3>
					</div>
					<div className="liab-oe-col">
						<h2>Liability and Owner Equity</h2>
						<h3>Liability = {liabTotal}</h3>
						<h3>Owner Equity: {ownerEquity}</h3>
						<h3>Ending Balance of OC = {oc}</h3>
						<h3>Total = {liabTotal + oc}</h3>
					</div>
				</div>
				<div className="balancediv">
					{flag == 1 && <h1 className="balance">Balanced</h1>}
					{flag == 0 && <h1 className="balance">UnBalanced</h1>}
				</div>
				<div className="balance-sheet2">
					<div className="asset-col">
						<h2>Trial Balance</h2>

						<h3>Assets = {assetsTotal}</h3>
						<h3>Liability = {liabTotal}</h3>
						<h3>Owner Equity: {ownerEquity}</h3>
						<h3>Owner withdraw: {ownerWithDraw}</h3>
						<h3>Revenue: {revTotal}</h3>
						<h3>Expense {expTotal}</h3>

						<h3>Ending Balance of OC = {endingOwnerEquity}</h3>

						<h3>Total = {liabTotal + endingOwnerEquity + ownerEquity}</h3>
					</div>
				</div>
			</>
		);
	};
	const allTypesData2 = () => {
		documents &&
			documents.map((arr, index) => {
				const { typeA, debit, debitInfo } = arr[0]; //type and amount
				const { typeB, credit, creditInfo } = arr[1];

				return debitInfo, debit, creditInfo, credit;
			});
		//console.log(assetsTotal,liabTotal);
	};
	const all3 = () => {
		const { debitInfo, debit, creditInfo, credit } = allTypesData2();

		return (
			<div>
				<h1>{debitInfo}</h1>
			</div>
		);
	};

	return (
		<div className="financial-statements">
			{generateIncomeStatement()}
			{generateOwnetEquityStatement()}
			{balanceSheetStatement()}
			{closing()}
		</div>
	);
}

export default FinancialStatementMainComponent;
