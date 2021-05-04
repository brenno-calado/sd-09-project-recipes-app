import { combineReducers } from 'redux';
import recipes from './recipes';
import drinkCategoriesList from './drinkCategoryList';
import mealCategoriesList from './mealCategoryList';
import setExploredIngredient from './ingredient';

const rootReducer = combineReducers({
  recipes,
  drinkCategoriesList,
  mealCategoriesList,
  setExploredIngredient,
});

export default rootReducer;
