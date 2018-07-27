import React from 'react';

import './Menu.css';

const menu = (props) => {
    return (
        <div className="MenuToggle" onClick={props.openSideDrawer}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default menu;