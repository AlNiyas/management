import React, { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const Home = () =>{
    console.log("Rendering Home");
    const [usersCount, setUsersCount]= useState("");
    useEffect(()=>{
        console.log("Home:useEffect");

        fetch("http://localhost:8080/api/users/count").
            then(response=>response.text()).
            then(data=>{
                    setUsersCount(data);
                });
    });
    return (
        <div className={styles.Main}>
            <p>Home Screen, where all the jungles and the header stuff lie. You can manage Users from the Users tab. Add as many as you want. Hope this is infex of the false statement. Home Screen, where all the jungles and the header stuff lie. You can manage Users from the Users tab. Add as many as you want. Hope this is infex of the false statement.</p>
            <div className={styles.Card}>
                <p>Users</p>
                <p>{usersCount}</p>
            </div>
        </div>
    //     <div className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Hi, Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </div>
    
    );

}

export default Home;