import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createMiddleware } from 'redux-api-middleware';
import logger from 'redux-logger';
import { combineReducers } from 'redux';

import entitiesReducer from './ducks/entities';

const root = combineReducers({
    ...entitiesReducer
});

const store = createStore(root, applyMiddleware(thunk, createMiddleware(), logger));

export default store;