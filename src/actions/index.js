import fetchRecipes from '../service/recepiesApi';
import fetchRecipeById from '../service/fetchDetails';
import fetchDefaultApi from '../service/defautFetchApi';
import categoriesfetchApi from '../service/categoriesFetchApi';
import fetchRecipeByCategory from '../service/fetchRecipeByCategory';
import fetchRecipeInProgressApi from '../service/fetchRecipeInProgressApi';
import recommendationsFetch from '../service/recommendationsFetch';

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

export const setCategories = (categories) => ({
  type: 'SET_CATEGORIES',
  categories,
});

export const categoriesfetchApiAction = () => (dispatch) => {
  categoriesfetchApi()
    .then((recipesApiReponse) => dispatch(setCategories(recipesApiReponse)));
};

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

const reciveInProgressApiResponse = (inProgressApiReponse) => ({
  type: 'RECIVE_RECIPE_IN_PROGRESS',
  recipeInProgress: inProgressApiReponse,
});

export const fetchRecipeInProgressAction = (id) => (dispatch) => {
  fetchRecipeInProgressApi(id)
    .then((inProgressApiReponse) => (
      dispatch(reciveInProgressApiResponse(inProgressApiReponse))));
};

const reciveDetailsRecipe = (recipesApiReponse) => ({
  type: 'RECIPE_DETAILS',
  recipeDetails: recipesApiReponse,
});

export const fetchRecipeByIdAction = (id) => (dispatch) => {
  fetchRecipeById(id)
    .then((recipesApiReponse) => dispatch(reciveDetailsRecipe(recipesApiReponse)));
};

const reciveFetchRecommendations = (recipesApiReponse) => ({
  type: 'RECOMMENDATIONS_FETCH',
  recommendations: recipesApiReponse,
});

export const recommendationsFetchAction = () => (dispatch) => {
  recommendationsFetch()
    .then((recipesApiReponse) => dispatch(reciveFetchRecommendations(recipesApiReponse)));
};
