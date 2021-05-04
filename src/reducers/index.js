import { combineReducers } from 'redux';
import recipes from './recipes';
import drinkCategoriesList from './drinkCategoryList';
import mealCategoriesList from './mealCategoryList';
import apiParameters from './apiParameters';

const rootReducer = combineReducers({
  recipes,
  drinkCategoriesList,
  mealCategoriesList,
  apiParameters,
});

export default rootReducer;
