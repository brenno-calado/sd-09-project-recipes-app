import { combineReducers } from 'redux';
import searchInputReducer from './SearchInputReducer';
import recipeInProgressReducer from './recipeInProgress';
import recipeDetails from './recipeDetails';
import exploreReducer from './ExploreReducer';

const rootReducer = combineReducers({
  searchInputReducer,
  recipeInProgressReducer,
  recipeDetails,
  exploreReducer,
});

export default rootReducer;
