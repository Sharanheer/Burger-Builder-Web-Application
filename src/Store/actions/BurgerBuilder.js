import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ing) => {
    return {
        type: actionTypes.ADD_INGREDIENT, 
        ingredient: ing
    }
}

export const removeIngredient = (ing) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT, 
        ingredient: ing
    }
}

export const getIngredient = (ingredient) => {
    return {
        type: actionTypes.GET_INGREDIENT,
        ingredient: ingredient
    }
}

export const getIngredientFailed = () => {
    return {
        type: actionTypes.GET_INGREDIENT_FAILED
    }
}

export const initIngredient = () => {
    return dispatch => {
        // dispatch(actionTypes.GET_INGREDIENT);
        axios.get('https://burger-builder-186bb.firebaseio.com/Ingredient.json')
            .then(response => {
                dispatch(getIngredient(response.data));
            })
            .catch(error => {
                dispatch(getIngredientFailed());
            });
    }
}
