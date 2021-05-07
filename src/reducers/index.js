import { combineReducers } from 'redux';
import searchInputReducer from './SearchInputReducer';
import recipeInProgressReducer from './recipeInProgress';
import recipeDetails from './recipeDetails';

const rootReducer = combineReducers({
  searchInputReducer,
  recipeInProgressReducer,
  recipeDetails,
});

export default rootReducer;
