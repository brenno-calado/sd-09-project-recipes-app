import { combineReducers } from 'redux';
import userReducer from './userReducer';
import recipesReducer from './recipesReducer';

const reducer = combineReducers({ userReducer, recipesReducer });

export default reducer;
