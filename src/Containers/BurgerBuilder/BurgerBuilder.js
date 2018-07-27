import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../Hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import BurgerControls from '../../Components/Burger/BurgerControls/BurgerControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../Store/actions/index';



class BurgerBuilder extends Component{

    state = {
        showSummary: false,
        spinner: false
    };

    componentDidMount(){
        
        this.props.initIngredient();
        if(this.props.token)
            this.props.initOrders(this.props.token, this.props.userId);
        // if(this.props.orders.length < 1){
        //     this.props.initOrders(this.props.token);
        // }
    }

    isOrderPurchasable(ingredient){
        return Object.keys(ingredient).map( key => ingredient[key]).reduce((sum, ele) => sum+=ele , 0) > 0;
    }

    canShowOrderSummaryHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({showSummary: true});
        }
        else{
            this.props.history.push('/auth');
        }
        
    }

    hideBackdropHandler = () => {
        this.setState({ showSummary: false});
    }

    continueOrder = () => {
        this.props.history.push('/checkout');
    }

    render(){

        let burgerbuilder = <Spinner />;
        let orderSummary;
        if(this.props.ings){

            orderSummary = <OrderSummary 
            ingredient={this.props.ings} 
            totalPrice={this.props.price}
            orderSummaryCancelled={this.hideBackdropHandler}
            orderSummaryContinued={this.continueOrder}/>;

            burgerbuilder = (
                <Aux>
                    <Modal display={this.state.showSummary} hideBackdrop={this.hideBackdropHandler}>
                        {orderSummary}
                    </Modal>    
                    <Burger ingredient={this.props.ings}/>
                    <BurgerControls 
                        more={this.props.addIngredient} 
                        less={this.props.removeIngredient}
                        disabledList={this.props.ings}
                        orderPurchasable={this.isOrderPurchasable(this.props.ings)}
                        price={this.props.price}  
                        orderSummary={this.canShowOrderSummaryHandler} 
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            );
        }

        if(this.props.error){
            burgerbuilder = <p>Error Fetching Ingredients</p>
        }
       
        if(this.state.spinner){
            orderSummary = <Spinner />;
        }
        
        return(
            <div>
            {burgerbuilder}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ing.ingredient,
        price: state.ing.totalPrice,
        error: state.ing.error,
        orders: state.ord.orders,
        token: state.auth.token,
        userId: state.auth.userId,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initIngredient: () => dispatch(actions.initIngredient()),
        addIngredient: (ing) => dispatch(actions.addIngredient(ing)),
        removeIngredient: (ing) => dispatch(actions.removeIngredient(ing)),
        initOrders : (token, userId) => dispatch(actions.orderFetchOnInit(token, userId))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));