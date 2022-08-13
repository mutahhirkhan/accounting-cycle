import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
  return (
      <><nav className="navbar">
              <ul>
                    <li> <NavLink to="/" className={ ({ isActive }) => (isActive ? 'active' : 'inactive')}>Home</NavLink></li>
                    <li> <NavLink to="/financial-statement" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Financial Statements</NavLink></li>
                    <li> <NavLink to="/balance-sheet" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Balance Sheet</NavLink></li>
                    <li> <NavLink to="/income-statement" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Income Statement</NavLink></li>
                    {/* <li><NavLink to="/ClosingAccounts"  className={`${insertClass("/ClosingAccounts")}`}>Closing Accounts</NavLink></li> */}
                    {/* <li><a href="#">Contact us</a></li> */}
                    
              </ul>
        </nav>
        
        </>
        
  );
};

export default Header;
