import fetchRecipes from '../service/recepiesApi';
import fetchDetails from '../service/fetchDetails';
import fetchDefaultApi from '../service/defautFetchApi';
import categoriesfetchApi from '../service/categoriesFetchApi';
import fetchRecipeByCategory from '../service/fetchRecipeByCategory';

export const receiveApiReponse = (response) => ({
  type: 'SEARCH_RECIPES',
  recipes: response,
});

export const fetchRecipesAction = (filter, searchInputValue) => (dispatch) => {
  switch (filter) {
  case 'ingredient':
    return fetchRecipes(`filter.php?i=${searchInputValue}`)
      .then((recipesApiReponse) => dispatch(receiveApiReponse(recipesApiReponse)));
  case 'name':
    return fetchRecipes(`search.php?s=${searchInputValue}`)
      .then((recipesApiReponse) => dispatch(receiveApiReponse(recipesApiReponse)));
  default:
    return fetchRecipes(`search.php?f=${searchInputValue}`)
      .then((recipesApiReponse) => dispatch(receiveApiReponse(recipesApiReponse)));
  }
};

export const defaultFetchApiAction = () => (dispatch) => {
  fetchDefaultApi()
    .then((recipesApiReponse) => dispatch(receiveApiReponse(recipesApiReponse)));
};

export const setIsLoading = () => ({
  type: 'SET_ISLOADING',
});

export const fetchMealRecipeDetails = (id) => (dispatch) => (
  fetchDetails(id, 'meal')
export const setCategories = (categories) => ({
  type: 'SET_CATEGORIES',
  categories,
});

export const categoriesfetchApiAction = () => (dispatch) => {
  categoriesfetchApi()
    .then((recipesApiReponse) => dispatch(setCategories(recipesApiReponse)));
};

export const fetchFoodRecipeDetails = (id) => (dispatch) => (
  fetchDetails('food', id)
    .then((recipesApiReponse) => dispatch({
      type: 'STORE_MEAL_RECIPE_DETAILS',
      id,
      recipeDetails: (recipesApiReponse.meals && recipesApiReponse.meals[0]) || null,
    })));

export const fetchDrinkRecipeDetails = (id) => (dispatch) => (
  fetchDetails(id, 'drink')
    .then((recipesApiReponse) => dispatch({
      type: 'STORE_DRINK_RECIPE_DETAILS',
      id,
      recipeDetails: (recipesApiReponse.drinks && recipesApiReponse.drinks[0]) || null,
    })));

export const fetchRecipesByCategoryAction = (categorie, category) => (dispatch) => {
  if (categorie !== category) {
    fetchRecipeByCategory(categorie)
      .then((recipesApiReponse) => dispatch(receiveApiReponse(recipesApiReponse)));
  } else {
    fetchDefaultApi()
      .then((recipesApiReponse) => dispatch(receiveApiReponse(recipesApiReponse)));
  }
};

export const setIsCategoryToTrueAction = () => ({
  type: 'SET_ISCATEGORY_TO_TRUE',
});

export const setIsCategoryToFalseAction = () => ({
  type: 'SET_ISCATEGORY_TO_FALSE',
});
