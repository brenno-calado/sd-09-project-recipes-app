import { combineReducers } from 'redux';
import searchInputReducer from './SearchInputReducer';
import drinkRecipeDetails from './drinkRecipeDetails';
import mealRecipeDetails from './mealRecipeDetails';

const rootReducer = combineReducers({
  searchInputReducer,
  drinkRecipeDetails,
  mealRecipeDetails,
});

export default rootReducer;
