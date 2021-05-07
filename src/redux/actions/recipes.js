import types from '../types';
import { fetchApi, genericFetch } from '../../services/api';

const { GET_RECIPES, REQUEST_RECIPES, CLEAR_RECIPES } = types;

const requestRecipes = () => ({ type: REQUEST_RECIPES });

const getRecipes = (recipes) => ({ type: GET_RECIPES, payload: recipes });

export const clearRecipes = () => ({ type: CLEAR_RECIPES });

export const fetchSearchRecipes = () => (
  (dispatch, getState) => {
    const { search } = getState();
    dispatch(requestRecipes());
    return fetchApi(search)
      .then((json) => {
        const recipesKey = Object.keys(json)[0];
        const recipesValue = json[recipesKey];
        const recipes = recipesValue ? Object.values(json[recipesKey]) : null;
        dispatch(getRecipes(recipes));
      })
      .catch(() => dispatch(getRecipes(null)));
  }
);

export const firstFetch = (foods) => (
  (dispatch) => {
    dispatch(requestRecipes());
    return genericFetch(foods)
      .then((response) => {
        const recipes = Object.entries(response)[0][1];
        dispatch(getRecipes(recipes));
      });
  }
);
