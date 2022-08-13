import React from "react";
import { useCollection } from "../../hooks/useCollection";
import { allTypesData } from "../../utils";
import "./financialstatement.css";

const InvomeStatement = () => {
  const { documents } = useCollection("generalEntry");

  const { netTotal, revTotal, expTotal } = allTypesData(documents);
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

export default InvomeStatement;
