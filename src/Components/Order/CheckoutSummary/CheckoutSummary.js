import React from 'react';

import './CheckoutSummary.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {

    return (
        <div className="CheckoutSummary">
            <h1> Your Burger...!!! </h1>
            <Burger ingredient={props.ingredient}/>
            <Button btnType="Danger" clicked={props.checkoutSummaryCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.checkoutSummaryContinued}>Proceed</Button>
        </div>    
    );
}

export default checkoutSummary;