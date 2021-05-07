import {
  REQ_SEARCH,
  SET_SEARCH,
  NOT_FOUND,
  RESET_NOT_FOUND,
  RECIPES_LIST,
  COULD_REDIRECT,
  SELECT_FILTER,
} from './actionTypes';
import fetchSearchBar from '../../services';
import { fetchByCategory } from '../../services/fetchCategories';

export const getRecipesAction = (recipes) => ({
  type: RECIPES_LIST,
  recipes,
});

export const reqSearch = () => ({ type: REQ_SEARCH });

export const setSearch = (items) => ({ type: SET_SEARCH, items });

export const resetNotFound = () => ({ type: RESET_NOT_FOUND });

export const notFound = () => ({ type: NOT_FOUND });

export const toggleCouldRedirectAction = (bool) => ({
  type: COULD_REDIRECT,
  bool,
});

export const selectFilterAction = (newFilter) => ({
  type: SELECT_FILTER,
  newFilter,
});

export const fetchSearch = (url) => async (dispatch) => {
  dispatch(reqSearch());
  const items = await fetchSearchBar(url);
  if (!items) return dispatch(notFound());
  dispatch(setSearch(items));
  return dispatch(resetNotFound());
};

export const getRecipesThunk = (recipeType, category) => async (dispatch) => {
  const recipes = await fetchByCategory(recipeType, category);

  dispatch(getRecipesAction(recipes));
};
