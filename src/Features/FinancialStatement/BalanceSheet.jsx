import React from "react";
import { useCollection } from "../../hooks/useCollection";
import { allTypesData } from "../../utils";
import "./financialstatement.css";

let Beginnigbalance = 28500;
function BalanceSheet() {
  const { documents, error } = useCollection("generalEntry");

  const {
    netTotal,
    assetsTotal,
    liabTotal,
    endingOwnerEquity,
    ownerWithDraw,
    ownerEquity,
    revTotal,
    expTotal,
  } = allTypesData(documents);

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

  return (
    <div>
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
    </div>
  );
}

export default BalanceSheet;
