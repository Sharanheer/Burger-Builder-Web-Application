import React from 'react';

import './Logo.css';

import burgerLogo from '../../Assets/Images/burger-logo.png';

const Logo = (props) => {
    return (
        <div className="Logo" style={{height: props.height, marginBottom: props.marginBottom}}>
            <img src={burgerLogo} alt="Burger" />
        </div>    
    );
}

export default Logo;