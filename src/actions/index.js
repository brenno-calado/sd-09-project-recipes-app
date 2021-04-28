import fetchRecipes from '../service/recepiesApi';
import fetchDetails from '../service/fetchDetails';

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

export const fetchFoodRecipeDetails = (id) => (dispatch) => (
  fetchDetails('food', id)
    .then((recipesApiReponse) => dispatch({
      type: 'STORE_FOOD_RECIPE_DETAILS',
      recipeDetails: recipesApiReponse,
    })));

export const fetchDrinkRecipeDetails = (id) => (dispatch) => (
  fetchDetails('drink', id)
    .then((recipesApiReponse) => dispatch({
      type: 'STORE_DRINK_RECIPE_DETAILS',
      recipeDetails: recipesApiReponse,
    })));
