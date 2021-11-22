import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import {Provider} from "react-redux";
import './index.css';
import App from './App';
import newsReducer from "./store/reducers/newsReducer";
import commentsReducer from "./store/reducers/commentsReducer";

const rootReducer = combineReducers({
    'news': newsReducer,
    'comments': commentsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));



