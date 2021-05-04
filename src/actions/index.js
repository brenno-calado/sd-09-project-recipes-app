import fetchRecipesData from '../services/fetchRecipesData';
import { fetchMealCategoryList,
  fetchDrinkCategoryList } from '../services/fetchCategoryList';

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const CLEAR_LIST = 'CLEAR_LIST';
export const MEAL = 'MEAL';
export const DRINK = 'DRINK';
export const REDIRECT = 'REDIRECT';
export const INGREDIENT = 'INGREDIENT';

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

export const clearList = () => ({
  type: CLEAR_LIST,
  recipesList: [],
});
