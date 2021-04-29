import { combineReducers } from 'redux';
import recipes from './recipes';
import drinkCategoriesList from './drinkCategoryList';
import mealCategoriesList from './mealCategoryList';

const rootReducer = combineReducers({
  recipes,
  drinkCategoriesList,
  mealCategoriesList,
});

export default rootReducer;
