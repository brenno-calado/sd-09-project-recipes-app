import { combineReducers } from 'redux';
import recipesList from './recipesList';
import filter from './filter';

const rootReducer = combineReducers({
  recipesList,
  filter,
});

export default rootReducer;
