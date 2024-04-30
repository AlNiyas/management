import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Home from "../Home/Home";
import styles from './Layout.module.css';
import { Outlet } from "react-router-dom";

const Layout = () => {
    console.log('Rendering Layout');
    return (
        
        <div className={styles.App}>
            <Header/>
            <div className={styles.MainContainer}>
                <Navigation/>
                <Outlet/>
            </div>
        </div> 
    );
}

export default Layout;