import { combineReducers } from 'redux';
import searchInputReducer from './SearchInputReducer';
import drinkRecipeDetails from './drinkRecipeDetails';
import foodRecipeDetails from './foodRecipeDetails';

const rootReducer = combineReducers({
  searchInputReducer,
  drinkRecipeDetails,
  foodRecipeDetails,
});

export default rootReducer;
