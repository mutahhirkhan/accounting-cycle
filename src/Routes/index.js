import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Dashboard from '../Features/Dashboard';
import GeneralEntries from '../Features/GeneralJournal';
import FinancialStatementMainComponent from '../Features/FinancialStatement';
import InvomeStatement from '../Features/FinancialStatement/InvomeStatement';
import TrialBalances from '../Features/FinancialStatement/TrialBalances';
import BalanceSheet from '../Features/FinancialStatement/BalanceSheet';

function RouterSwitch() {
  return (

    <Routes>
      <Route path="/" element={<GeneralEntries />} />
      <Route path="/financial-statement" element={<FinancialStatementMainComponent />} />
      <Route path="/trial-balances" element={<TrialBalances />} />
      <Route path="/income-statement" element={<InvomeStatement />} />
      <Route path="/balance-sheet" element={<BalanceSheet />} />
    </Routes>


  );
}

export default RouterSwitch;
