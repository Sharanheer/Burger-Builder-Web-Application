import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    spinner: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_SPINNER:
            return {
                ...state,
                spinner: true,
                error: null
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                spinner: false,
                error: null
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                token: null,
                userId: null,
                spinner: false,
                error: action.error
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
        default:
            return state

    }
} 

export default reducer;