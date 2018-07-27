import React from 'react';
import Aux from '../../../Hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientList =  Object.keys(props.ingredient).map(key =>
        <li key={key}><span style={{ textTransform: 'capitalize'}}>{key}</span> : {props.ingredient[key]}</li>
    )

    return (
        <Aux>
            <h3>Your Order Summary</h3>
            <p>Total Price: $<strong>{props.totalPrice.toFixed(2)}</strong></p>
            <p>You have added below ingredients to your Burger:</p>
            <ul>
                {ingredientList}
            </ul>    
            <p>Continue to Checkout...?</p>
            <Button btnType="Danger" clicked={props.orderSummaryCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.orderSummaryContinued}>PROCEED</Button>
        </Aux>   
    ); 
} 

export default orderSummary;
