import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GeneralEntriesContainer from '../Features/GeneralJournal';
import IncomeStatement from '../Features/FinancialStatement/IncomeStatement';
import TrialBalances from '../Features/FinancialStatement/TrialBalances';
import BalanceSheet from '../Features/FinancialStatement/BalanceSheet';
import GeneralEntries from '../Features/GeneralJournal/Components/GeneralEntries';
import OwnerEquity from '../Features/FinancialStatement/OwnerEquity';

function RouterSwitch() {
  return (

    <Routes>
      <Route path="/" element={<GeneralEntriesContainer />} />
      <Route path="/trial-balances" element={<TrialBalances />} />
      <Route path="/income-statement" element={<IncomeStatement />} />
      <Route path="/balance-sheet" element={<BalanceSheet />} />
      <Route path="/general-entries" element={<GeneralEntries />} />
      {/* add owner-equity route */}
      <Route path="/owner-equity" element={<OwnerEquity />} />
    </Routes>


  );
}

export default RouterSwitch;
