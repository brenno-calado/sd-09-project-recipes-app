import { SEARCH, RECIPES_LIST } from './actionTypes';
import fetchRecipes from '../../services/fetchRecipes';

export const searchBar = () => ({ type: SEARCH });

const getRecipesAction = (recipes, listType) => ({
  type: RECIPES_LIST,
  recipes,
  listType,
});

export const getRecipesThunk = (endpoit, listType) => async (dispatch) => {
  const recipesList = await fetchRecipes(endpoit, listType);
  dispatch(getRecipesAction(recipesList, listType));
};
