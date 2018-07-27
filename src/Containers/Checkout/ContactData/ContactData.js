import React, { Component } from 'react';
import { connect } from 'react-redux';
 
import './ContactData.css';

import Button from '../../../Components/UI/Button/Button';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import * as actions from '../../../Store/actions/index';


class ContactData extends Component {
    state = {
        customer: {
            name: '',
            email: '',
            phone: '',
            street: '',
            zipcode: '',
            country: ''
        }, 
        deliveryMethod: 'normal'
        // spinner: false
    }

    orderSubmittedHandler = (event) => {
        event.preventDefault();
        
        // this.setState({spinner: true});
        
        let order = {
            ingredients : this.props.ings,
            price : this.props.price,
            customer : this.state.customer, 
            delivery: this.state.deliveryMethod,
            userId: this.props.userId
        };
        this.props.orderSubmit(order, this.props.history, this.props.token);
    }

    inputChangeHandler = (name, event) => {
        let field = event.target.value;
        //console.log(name, field);
        if(name === 'deliveryMethod'){
            this.setState({deliveryMethod: field});
            return;
        }

        let updatedCustomer = {...this.state.customer};
        updatedCustomer[name] = field;
        //console.log(updatedCustomer[name]);
        this.setState({customer: updatedCustomer});
    }

    render () {
        let loading; 
        // loading = loading = <Button btnType="Success" clicked={this.orderSubmittedHandler}>ORDER</Button>
        loading = loading = <Button btnType="Success" >ORDER</Button>
        if(this.props.spinner){
            loading = <Spinner />
        }
        
        return (
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                <form onSubmit={this.orderSubmittedHandler}>
                    <input className="Input" type="text" name="name" placeholder="Your Name" required onChange={(event) => {this.inputChangeHandler("name", event)}}/>
                    <input className="Input" type="email" name="email" placeholder="Your Mail" required onChange={(event) => {this.inputChangeHandler("email", event)}}/>
                    <input className="Input" type="text" name="phone" placeholder="Phone" required onChange={(event) => {this.inputChangeHandler("phone", event)}}/>
                    <input className="Input" type="text" name="street" placeholder="Street" required onChange={(event) => {this.inputChangeHandler("street", event)}}/>
                    <input className="Input" type="text" name="zipcode" placeholder="ZIP CODE" required onChange={(event) => {this.inputChangeHandler("zipcode", event)}}/>
                    <input className="Input" type="text" name="country" placeholder="Country" required onChange={(event) => {this.inputChangeHandler("country", event)}}/>
                    <select style={{width: '80%'}} onChange={(event) => {this.inputChangeHandler("deliveryMethod", event)}}>
                        <option value="normal" >Normal</option>
                        <option value="express" >Express</option>
                    </select>
                    <br />
                    {loading} 
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ing.ingredient,
        price: state.ing.totalPrice,
        spinner: state.ord.spinner,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderSubmit : (order, history, token) => dispatch(actions.orderStart(order, history, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);