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
                    <li> <NavLink to="/trial-balances" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Trial Balances</NavLink></li>
                    <li> <NavLink to="/income-statement" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Income Statement</NavLink></li>
              </ul>
        </nav>
        
        </>
        
  );
};

export default Header;
