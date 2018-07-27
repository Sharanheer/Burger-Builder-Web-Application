import React from 'react';

import './Backdrop.css';

const backdrop = (props) => (
    props.display ? <div className="Backdrop" onClick={props.back}></div> : null 
)

export default backdrop;
 