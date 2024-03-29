import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
  return (
      <><nav className="navbar">
              <ul>
                  <li> <NavLink to="/" className={ ({ isActive }) => (isActive ? 'active' : 'inactive')}>Home</NavLink></li>
                  {/* <li> <NavLink to="/financial-statement" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Financial Statements</NavLink></li> */}
                  <li> <NavLink to="/general-entries" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>General Entries</NavLink></li>
                  <li> <NavLink to="/trial-balances" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Trial Balances</NavLink></li>
                  <li> <NavLink to="/income-statement" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Income Statement</NavLink></li>
                  <li> <NavLink to="/balance-sheet" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Balance Sheet</NavLink></li>
                  <li> <NavLink to="/owner-equity" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Owner Equity</NavLink></li>
                  <li> <NavLink to="/test" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Test</NavLink></li>

              </ul>
        </nav>
        
        </>
        
  );
};

export default Header;
