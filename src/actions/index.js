import fetchRecipesData from '../services/fetchRecipesData';
import { fetchMealCategoryList,
  fetchDrinkCategoryList } from '../services/fetchCategoryList';

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const CLEAR_LIST = 'CLEAR_LIST';
export const MEAL = 'MEAL';
export const DRINK = 'DRINK';
export const REDIRECT = 'REDIRECT';
export const INGREDIENT = 'INGREDIENT';
export const LOADING = 'LOADING';
export const RECIPE_TYPE = 'RECIPE_TYPE';
export const RECIPE_QUERY = 'RECIPE_QUERY';
export const RECIPE_CASE = 'RECIPE_CASE';

export const setRedirect = () => ({
  type: REDIRECT,
});

const receiveRecipes = (recipesList, category) => ({
  type: FETCH_RECIPES,
  recipesType: category,
  recipesList,
});

export const exploredIngredient = (ingredient) => ({
  type: INGREDIENT,
  ingredient,
});

const mealCategoryList = (categories) => ({
  type: MEAL,
  categories,
});
export const recipeType = (mealOrDrink) => ({
  type: RECIPE_TYPE,
  mealOrDrink,
});
export const recipeQuery = (query) => ({
  type: RECIPE_QUERY,
  query,
});
export const recipeCase = (searchBy) => ({
  type: RECIPE_CASE,
  searchBy,
});
const drinkCategoryList = (categories) => ({
  type: DRINK,
  categories,
});

export function searchRecipe(type, text, category) {
  return async (dispatch) => {
    const recipesList = await fetchRecipesData(type, text, category);
    return dispatch(receiveRecipes(recipesList, category));
  };
}

export function requestMealCategoryList() {
  return async (dispatch) => {
    const categoryList = await fetchMealCategoryList();
    return dispatch(mealCategoryList(categoryList));
  };
}

export function requestDrinkCategoryList() {
  return async (dispatch) => {
    const categoryList = await fetchDrinkCategoryList();
    return dispatch(drinkCategoryList(categoryList));
  };
}

export const loadFlag = (bool) => ({
  type: LOADING,
  bool,
});

export const clearList = () => ({
  type: CLEAR_LIST,
  recipesList: [],
});
