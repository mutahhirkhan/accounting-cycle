import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
  return (
      <><nav class="navbar">
              <ul>
                    <li><a><i class="fa fa-fw fa-home"></i> <NavLink to="/" className="">Home</NavLink></a></li>
                    <li> <NavLink to="/financial-statement" className="">Financial Statements</NavLink></li>
                    <li> </li>
                    <li><NavLink to="/ClosingAccounts" className="">Closing Accounts</NavLink></li>
                    <li><a href="#">Contact us</a></li>
                    
              </ul>
        </nav>
        
        </>
        
  );
};

export default Header;
