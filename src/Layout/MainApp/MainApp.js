import React from 'react'
import Header from '../Header/Header';
import Body from '../Body';
import commonClasses from '../../Styles/CommonStyles.module.css';
import { BrowserRouter as Router } from 'react-router-dom';

function MainApp() {
    return (
        <div className="">
            <Router>
                <Header/>
                <Body />
            </Router>
        </div>
    )
}

export default MainApp;
