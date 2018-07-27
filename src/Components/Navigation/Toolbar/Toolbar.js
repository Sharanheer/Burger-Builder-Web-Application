import React from 'react';

import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../../Menu/Menu';

const toolbar = (props) => {
    return (
        <header className="Toolbar">
            <Menu openSideDrawer={props.openSideDrawer} />
            <Logo height="80%"/>
            <nav className="DesktopOnly">
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>    
        </header>
    );
}

export default toolbar;


