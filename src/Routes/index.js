import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../Features/Dashboard';
import GeneralEntries from '../Features/GeneralJournal';
import FinancialStatementMainComponent from '../Features/FinancialStatement';

function RouterSwitch() {
  return (
  
       <Routes>
         <Route path="/" element={<GeneralEntries />}/>
         <Route path="/financial-statement" element={<FinancialStatementMainComponent/>} />
           
       </Routes>
    

  );
}

export default RouterSwitch;
