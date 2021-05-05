import { combineReducers } from 'redux';
import recipes from './recipes';
import drinkCategoriesList from './drinkCategoryList';
import mealCategoriesList from './mealCategoryList';
import apiParameters from './apiParameters';
import mealsArea from './mealsArea';

const rootReducer = combineReducers({
  recipes,
  drinkCategoriesList,
  mealCategoriesList,
  apiParameters,
  mealsArea,
});

export default rootReducer;
