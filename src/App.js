import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import GeneralEntriesContainer from "./Features/GeneralJournal/index";
import TrialBalances from "./Features/FinancialStatement/TrialBalances";
import IncomeStatement from "./Features/FinancialStatement/IncomeStatement";
import BalanceSheet from "./Features/FinancialStatement/BalanceSheet";
import GeneralEntries from "./Features/GeneralJournal/Components/GeneralEntries/index";
import OwnerEquity from "./Features/FinancialStatement/OwnerEquity";
import Test from "./Features/Test/Test";

function App() {
	return (
		<div className="App">
			<div className="">
				<Router>
					<Header />
					<Routes>
						<Route path="/" element={<GeneralEntriesContainer />} />
						<Route path="/trial-balances" element={<TrialBalances />} />
						<Route path="/income-statement" element={<IncomeStatement />} />
						<Route path="/balance-sheet" element={<BalanceSheet />} />
						<Route path="/general-entries" element={<GeneralEntries />} />
						<Route path="/owner-equity" element={<OwnerEquity />} />
						<Route path="/test" element={<Test />} />
					</Routes>   
				</Router>
			</div>
		</div>
	);
}

export default App;
