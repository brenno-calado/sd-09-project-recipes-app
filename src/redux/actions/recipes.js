import types from '../types';
import fetchApi from '../../services/api';

const { GET_RECIPES, REQUEST_RECIPES, CLEAR_RECIPES } = types;

const requestRecipes = () => ({ type: REQUEST_RECIPES });

const getRecipes = (recipes) => ({ type: GET_RECIPES, payload: recipes });

export const clearRecipes = () => ({ type: CLEAR_RECIPES });

export const fetchSearchRecipes = () => (
  (dispatch, getState) => {
    const { search } = getState();
    dispatch(requestRecipes());
    return fetchApi(search)
      .then((json) => dispatch(getRecipes(json)));
  }
);
