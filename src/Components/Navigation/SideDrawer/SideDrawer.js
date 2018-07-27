import React from 'react';

import './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../Hoc/Aux';

const sideDrawer = (props) => {

    let classes = ['SideDrawer', 'Close'];

    if(props.display){
        classes = ['SideDrawer', 'Open'];
    }

    return (
        <Aux>
        <Backdrop display={props.display} back={props.clicked}/>
        <div className={classes.join(' ')} onClick={props.clicked}>
            <Logo height="11%" marginBottom="32px"/>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </div>
        </Aux>
    );
} 

export default sideDrawer;