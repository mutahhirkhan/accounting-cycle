import React from 'react';
import commonClasses from '../../Styles/CommonStyles.module.css';
import classes from './dashboard.module.css';
import ShowcaseImage from '../../assets/showcase.jpg';

function Dashboard() {
    return (
        <div className={`${commonClasses['container-full-screen']} ${classes['body-container']} container-fluid`}>
            <div className="row">
                <div className={`${classes['main-image']} col-lg-12 mt-0`}>
                    <img src={ShowcaseImage} alt="showcase"/>
                    <h1 className={classes['image-text']}>
                        ABC Company's Account
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
