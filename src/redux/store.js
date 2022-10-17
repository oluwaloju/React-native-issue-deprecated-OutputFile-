import { configureStore,combineReducers,applyMiddleware } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import taskReducer from './reducers';
// import {configureStore} from 'redux'

const rootreducer=combineReducers({taskReducer})

const Store = configureStore({reducer:rootreducer}, applyMiddleware(thunkMiddleware))

export default Store