import * as actionTypes from '../actions/actionTypes';


const initialState = {
    orders: [],
    spinner: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ORDER_INIT:
            return {
                ...state,
                orders: action.ordersFetched,
                spinner: false,
                error: null
            }
        case actionTypes.ORDER_SUCCESS:
            const order = {
                ...action.orderData,
                orderId : action.orderId.name
            }
            return {
                ...state,
                orders : state.orders.concat(order),
                spinner: false,
                error: null
            }
        case actionTypes.ORDER_FAIL:
            return {
                ...state,
                spinner: false,
                error: action.error
            }
        case actionTypes.ORDER_SPINNER:
            return {
                ...state,
                spinner: true 
            }
        default:
            return state;
    }
}

export default reducer;