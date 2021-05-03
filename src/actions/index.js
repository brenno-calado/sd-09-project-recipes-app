import fetchRecipes from '../service/recepiesApi';
import fetchDetails from '../service/fetchDetails';
import fetchDefaultApi from '../service/defautFetchApi';

export const receiveApiReponse = (response) => ({
  type: 'SEARCH_RECIPES',
  recipes: response,
});

export const fetchRecipesAction = (filter, searchInputValue) => (dispach) => {
  switch (filter) {
  case 'ingredient':
    return fetchRecipes(`filter.php?i=${searchInputValue}`)
      .then((recipesApiReponse) => dispach(receiveApiReponse(recipesApiReponse)));
  case 'name':
    return fetchRecipes(`search.php?s=${searchInputValue}`)
      .then((recipesApiReponse) => dispach(receiveApiReponse(recipesApiReponse)));
  default:
    return fetchRecipes(`search.php?f=${searchInputValue}`)
      .then((recipesApiReponse) => dispach(receiveApiReponse(recipesApiReponse)));
  }
};

export const defaultFetchApiAction = () => (dispach) => {
  fetchDefaultApi()
    .then((recipesApiReponse) => dispach(receiveApiReponse(recipesApiReponse)));
};

export const setIsLoading = () => ({
  type: 'SET_ISLOADING',
});

export const fetchMealRecipeDetails = (id) => (dispatch) => (
  fetchDetails(id, 'meal')
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
