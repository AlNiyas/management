import { INavLink, INavLinkGroup, INavStyles, Nav } from "@fluentui/react";
import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import styles from './Navigation.module.css';

const navigationStyles: Partial<INavStyles> = {
    root:{
        width:208,
        height: 350,
        boxSizing: 'border-box',
        border: '1px solid #eee',
        overflowY: 'auto'
    }
};


const navigationLinks : INavLinkGroup[] = [
    {
      links:[{
        name:'Home',
        url:'/home',
        key:'homeNavigationKey',
        title:'Home'
      },
      {
        name:'Users',
        url:'/users',
        key:'usersNavigationKey',
        title:'Users'
      }]  
    }
    
];

function onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink): void {
  console.log("onLinkClick" + item?.key);
}

// const Navigation:React.FC = () => {
//     console.log("Rendering Navigation");
//     return (
//         <Nav selectedKey="homeNavigationKey" groups={navigationLinks} styles={navigationStyles} onLinkClick={onLinkClick}></Nav>
//     );
// }

const Navigation:React.FC = () => {
  console.log("Rendering Navigation");
  return (
    <div  className={styles.navbar}>
      <nav>
        <ul><NavLink to="/home">Home</NavLink></ul>
        <ul><NavLink to="/users">Users</NavLink></ul>
      </nav>
      </div>
  );
}

export default Navigation;