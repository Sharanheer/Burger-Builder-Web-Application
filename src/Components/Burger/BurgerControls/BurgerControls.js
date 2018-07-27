import React from 'react';

import './BurgerControls.css';
import BurgerControl from './BurgerControl/BurgerControl';

let list = [
    {label: 'Salad', value: 'salad'},
    {label: 'Bacon', value: 'bacon'},
    {label: 'Cheese', value: 'cheese'},
    {label: 'Meat', value: 'meat'}
];

const BurgerControls = (props) => {
    return(
        <div className="BurgerControls">
            <p>Current Price: $<strong>{props.price.toFixed(2)}</strong></p>
            { 
                list.map( control => {
                    return <BurgerControl 
                    label={control.label} 
                    key={control.label} 
                    add={ () => props.more(control.value) }
                    remove={ () => props.less(control.value) }
                    disable={props.disabledList[control.value]}
                    />
                })
            } 
            <button 
            className="OrderButton" 
            disabled={!props.orderPurchasable}
            onClick={props.orderSummary}
            >
            {props.isAuth ? 'ORDER NOW' : 'Sign Up To Order'}
            </button>
        </div>
    );
}

export default BurgerControls;