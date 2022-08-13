import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Dashboard from '../Features/Dashboard';
import GeneralEntries from '../Features/GeneralJournal';
import FinancialStatementMainComponent from '../Features/FinancialStatement';
import BalanceSheet from '../Features/FinancialStatement/BalanceSheet';
import InvomeStatement from '../Features/FinancialStatement/InvomeStatement';

function RouterSwitch() {
  return (

    <Routes>
      <Route path="/" element={<GeneralEntries />} />
      <Route path="/financial-statement" element={<FinancialStatementMainComponent />} />
      <Route path="/balance-Sheet" element={<BalanceSheet />} />
      <Route path="/income-statement" element={<InvomeStatement />} />
    </Routes>


  );
}

export default RouterSwitch;
