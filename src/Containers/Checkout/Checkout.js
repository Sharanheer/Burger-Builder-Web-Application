import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{

    checkoutSummaryContinuedHandler = () => {
        // this.props.history.replace('/checkout/payment');
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutSummaryCancelledHandler = () => {
        this.props.history.goBack();
    }


    render(){
        // console.log(this.props);
        let checkoutSummary = null;
        if(this.props.ings){
            checkoutSummary = (
                <div>
                    <CheckoutSummary ingredient={this.props.ings} 
                        checkoutSummaryContinued={this.checkoutSummaryContinuedHandler}
                        checkoutSummaryCancelled={this.checkoutSummaryCancelledHandler}/>
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                </div>
            );
        }else{
            checkoutSummary = <Redirect to="/"/>;
        }
        
        return checkoutSummary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ing.ingredient,
        price: state.ing.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);