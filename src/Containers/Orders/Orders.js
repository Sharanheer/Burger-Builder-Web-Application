import React, {Component} from 'react';
import { connect } from 'react-redux';

import Order from '../../Components/Order/Order';
import * as actions from '../../Store/actions/index';

class Orders extends Component{

    componentDidMount(){

        // if(this.props.orders.length < 1){
        //     this.props.initOrders(this.props.token, this.props.userId);
        // }
        this.props.initOrders(this.props.token, this.props.userId)
    }
 
    render(){
        return (
            <div>
                {this.props.orders.map( order => {
                    return <Order key={order.orderId} ingredients={order.ingredients} price={order.price}/>
                })}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.ord.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        initOrders : (token, userId) => dispatch(actions.orderFetchOnInit(token, userId))
    }  
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);