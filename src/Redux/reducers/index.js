import { combineReducers } from 'redux';
import searchBar from './searchBar';
import recipesList from './recipesList';

const rootReducer = combineReducers({
  searchBar,
  recipesList,
});

export default rootReducer;
