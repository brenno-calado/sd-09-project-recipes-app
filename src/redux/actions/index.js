import {
  SAVE_PATH,
  FETCHING,
  SUCCESS_FETCH,
  FAILURE_FETCH,
  FETCHING_CATEGORIES,
  SUCCESS_CATEGORIES,
  FAILURE_CATEGORIES,
  FETCHING_RECIPE,
  SUCCESS_RECIPE,
  SUCCESS_RECOMMENDED,
  SAVE_INGREDIENTS,
  SEND_DONE_RECIPES,
  SEND_FAVORITE_RECIPES,
} from './actionTypes';
import {
  fetchByIngredient,
  fetchByName,
  fetchByFirstLetter,
  fetchMealsCategories,
  fetchInitialMeals,
  fetchMealsByCategory,
  fetchMealsById,
} from '../../services/mealsAPI';
import {
  cocktailsByIngredient,
  cocktailsByName,
  cocktailsByFirstLetter,
  fetchCocktailsCategories,
  fetchInitialCocktails,
  fetchCocktailsByCategory,
  fetchCocktailsById,
} from '../../services/cocktailsAPI';

export const savePath = (pathname, recipeType) => ({
  type: SAVE_PATH,
  pathname,
  recipeType,
});

const fetching = () => ({
  type: FETCHING,
});

const sucessFetch = (data) => ({
  type: SUCCESS_FETCH,
  data,
});

const failureFetch = (error) => ({
  type: FAILURE_FETCH,
  error,
});

export function mealsThunk(typeSearch, textSearch) {
  return (dispatch) => {
    dispatch(fetching());
    if (typeSearch === '') {
      return fetchInitialMeals()
        .then((data) => dispatch(sucessFetch(data)))
        .catch((error) => dispatch(failureFetch(error)));
    }
    if (typeSearch === 'ingredient-search') {
      return fetchByIngredient(textSearch)
        .then((data) => dispatch(sucessFetch(data)))
        .catch((error) => dispatch(failureFetch(error)));
    }
    if (typeSearch === 'name-search') {
      return fetchByName(textSearch)
        .then((data) => dispatch(sucessFetch(data)))
        .catch((error) => dispatch(failureFetch(error)));
    }
    if (typeSearch === 'first-letter-search') {
      return fetchByFirstLetter(textSearch)
        .then((data) => dispatch(sucessFetch(data)))
        .catch((error) => dispatch(failureFetch(error)));
    }
  };
}

export function cocktailsThunk(typeSearch, textSearch) {
  return (dispatch) => {
    dispatch(fetching());
    if (typeSearch === '') {
      return fetchInitialCocktails()
        .then((data) => dispatch(sucessFetch(data)))
        .catch((error) => dispatch(failureFetch(error)));
    }
    if (typeSearch === 'ingredient-search') {
      return cocktailsByIngredient(textSearch)
        .then((data) => dispatch(sucessFetch(data)))
        .catch((error) => dispatch(failureFetch(error)));
    }
    if (typeSearch === 'name-search') {
      return cocktailsByName(textSearch)
        .then((data) => dispatch(sucessFetch(data)))
        .catch((error) => dispatch(failureFetch(error)));
    }
    if (typeSearch === 'first-letter-search') {
      return cocktailsByFirstLetter(textSearch)
        .then((data) => dispatch(sucessFetch(data)))
        .catch((error) => dispatch(failureFetch(error)));
    }
  };
}

const fetchingCategories = () => ({
  type: FETCHING_CATEGORIES,
});

const successCategories = (data) => ({
  type: SUCCESS_CATEGORIES,
  data,
});

const failureCategories = (error) => ({
  type: FAILURE_CATEGORIES,
  error,
});

export function mealsCategoriesThunk() {
  return (dispatch) => {
    dispatch(fetchingCategories());
    return fetchMealsCategories()
      .then((data) => dispatch(successCategories(data)))
      .catch((error) => dispatch(failureCategories(error)));
  };
}

export function cocktailsCategoriesThunk() {
  return (dispatch) => {
    dispatch(fetchingCategories());
    return fetchCocktailsCategories()
      .then((data) => dispatch(successCategories(data)))
      .catch((error) => dispatch(failureCategories(error)));
  };
}

export function mealsByCategoriesThunk(category) {
  return (dispatch) => {
    dispatch(fetchingCategories());
    return fetchMealsByCategory(category)
      .then((data) => dispatch(sucessFetch(data)))
      .catch((error) => dispatch(failureFetch(error)));
  };
}

export function cocktailsByCategoriesThunk(category) {
  return (dispatch) => {
    dispatch(fetchingCategories());
    return fetchCocktailsByCategory(category)
      .then((data) => dispatch(sucessFetch(data)))
      .catch((error) => dispatch(failureFetch(error)));
  };
}

export const fetchingRecipe = () => ({
  type: FETCHING_RECIPE,
});

const successRecipe = (data) => ({
  type: SUCCESS_RECIPE,
  data,
});

export function mealsByIdThunk(id) {
  return (dispatch) => {
    dispatch(fetchingRecipe());
    return fetchMealsById(id)
      .then((data) => dispatch(successRecipe(data)))
      .catch((error) => dispatch(failureFetch(error)));
  };
}

export function cocktailsByIdThunk(id) {
  return (dispatch) => {
    dispatch(fetchingRecipe());
    return fetchCocktailsById(id)
      .then((data) => dispatch(successRecipe(data)))
      .catch((error) => dispatch(failureFetch(error)));
  };
}

const successRecommended = (data) => ({
  type: SUCCESS_RECOMMENDED,
  data,
});

export function mealsRecommendedThunk() {
  return (dispatch) => {
    dispatch(fetching());
    return fetchInitialMeals()
      .then((data) => dispatch(successRecommended(data)))
      .catch((error) => dispatch(failureFetch(error)));
  };
}

export function cocktailsRecommendedThunk() {
  return (dispatch) => {
    dispatch(fetching());
    return fetchInitialCocktails()
      .then((data) => dispatch(successRecommended(data)))
      .catch((error) => dispatch(failureFetch(error)));
  };
}

export const saveIngredients = (ingredients) => ({
  type: SAVE_INGREDIENTS,
  ingredients,
});

export const sendDoneRecipes = (recipes) => ({
  type: SEND_DONE_RECIPES,
  recipes,
});

export const sendFavoriteRecipes = (recipes) => ({
  type: SEND_FAVORITE_RECIPES,
  recipes,
});
