import React from 'react';

import './BurgerControl.css';

const BurgerControl = (props) => {
    return(
        <div className="BurgerControl">
            <p className="label">{props.label}</p>
            <button className="Less" onClick={props.remove} disabled={props.disable === 0}>less</button>
            <button className="More" onClick={props.add}>more</button>
        </div>
    );
}

export default BurgerControl;