import * as actionTypes from '../actions/actionTypes';


const initialState = {
    ingredient: null,
    totalPrice: 2,
    error: false,
    building: false
}

const prices = {
    'cheese': 0.5,
    'bacon':  1,
    'salad': 0.3,
    'meat':  1.5,
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredient: {
                    ...state.ingredient,
                    [action.ingredient]: state.ingredient[action.ingredient] + 1
                },
                totalPrice: state.totalPrice + prices[action.ingredient],
                building: true
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredient: {
                    ...state.ingredient,
                    [action.ingredient]: state.ingredient[action.ingredient] - 1
                },
                totalPrice: state.totalPrice - prices[action.ingredient],
                building: true
            }
        case actionTypes.GET_INGREDIENT:
            return {
                ...state,
                ingredient: {
                    salad: action.ingredient.salad,
                    bacon: action.ingredient.bacon,
                    cheese: action.ingredient.cheese,
                    meat: action.ingredient.meat
                },
                totalPrice: 2,
                error: false,
                building: false
            }
        case actionTypes.GET_INGREDIENT_FAILED:
            return {
                ...state,
                error: true,
                building: false
            }
        default:
            return state;
    }
}

export default reducer;