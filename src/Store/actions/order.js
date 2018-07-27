import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const orderInit = (orders) => {
    return {
        type: actionTypes.ORDER_INIT,
        ordersFetched: orders
    }
}

export const orderFetchOnInit = (token, userId) => {
    return dispatch => {
        dispatch(orderSpinner());
        let ordersFetched = [];
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then( res => {
                for(let key in res.data){
                    ordersFetched.push({
                        ...res.data[key],
                        orderId: key
                    });
                }
                dispatch(orderInit(ordersFetched));
            })
            .catch( err => {
                console.log('error while fetching orders');
                dispatch(orderFail(err));
            });
    }
}

export const orderSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.ORDER_SUCCESS,
        orderData: orderData,
        orderId: orderId
    }
}

export const orderFail = (err) => {
    return {
        type: actionTypes.ORDER_FAIL,
        error: err
    }
}

export const orderSpinner = () => {
    return{
        type: actionTypes.ORDER_SPINNER
    }
}

export const orderStart = (orderData, history, token) => {
    return dispatch => {
        dispatch(orderSpinner());
        axios.post('/orders.json?auth=' + token, orderData)
            .then( response => {
                console.log('Successful...');
                //this.setState({ spinner: false});
                // console.log(response.data);
                dispatch(orderSuccess(response.data, orderData)); 
                // this.props.history.replace('/'); 
                history.replace('/');
            })
            .catch( err => {
                // console.log('Error Connecting');
                // this.setState({ spinner: false});
                // console.log(err);
                dispatch(orderFail(err));
            });
    }
}