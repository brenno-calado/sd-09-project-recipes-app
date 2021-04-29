import { combineReducers } from 'redux';
import recipesList from './recipesList';
import couldRedirect from './couldRedirect';

const rootReducer = combineReducers({
  recipesList,
  couldRedirect,
});

export default rootReducer;
