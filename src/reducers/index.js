import { combineReducers } from 'redux';
import searchInputReducer from './SearchInputReducer';
import drinkRecipeDetails from './drinkRecipeDetails';
import recipeInProgressReducer from './recipeInProgress';
import mealRecipeDetails from './mealRecipeDetails';

const rootReducer = combineReducers({
  searchInputReducer,
  drinkRecipeDetails,
  recipeInProgressReducer,
  mealRecipeDetails,
});

export default rootReducer;
