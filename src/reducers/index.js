import { combineReducers } from 'redux';
import searchInputReducer from './SearchInputReducer';
import drinkRecipeDetails from './drinkRecipeDetails';
import foodRecipeDetails from './foodRecipeDetails';
import recipeInProgressReducer from './recipeInProgress';

const rootReducer = combineReducers({
  searchInputReducer,
  drinkRecipeDetails,
  foodRecipeDetails,
  recipeInProgressReducer,
});

export default rootReducer;
