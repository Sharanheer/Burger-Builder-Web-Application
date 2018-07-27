
import React from 'react';

import './Burger.css';
import './BurgerIngredient/BurgerIngredient';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let newIngredientList = Object.keys(props.ingredient).map(
        (key) => {
           return [...Array(props.ingredient[key])].map( 
               (_,index) => {
                   return <BurgerIngredient key={key+index} type={key}/>
                }
            ) 
        }
    ).reduce( (pre, curr) => {
        return pre.concat(curr)
    }, []);

    if(newIngredientList.length === 0)
        newIngredientList = (<p>Please start adding ingredients...!</p>);
    
    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top"/>
            {newIngredientList}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default Burger;