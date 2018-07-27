import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {Provider} from 'react-redux';
import burgerBuilderReducer from './Store/reducers/BurgerBuilder';
import orderReducer from './Store/reducers/order';
import authReducer from './Store/reducers/auth';

// const mymiddleware = store => {
//     return next => {
//         return action => {
//             console.log('[Middleware]', action);
//             next(action);
//         }
//     }
// }

const rootReducer = combineReducers({
    ing: burgerBuilderReducer,
    ord: orderReducer,
    auth: authReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store  = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
