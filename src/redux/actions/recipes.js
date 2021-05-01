import types from '../types';
import fetchApi from '../../services/api';

const { GET_RECIPES, REQUEST_RECIPES } = types;

const requestRecipes = () => ({ type: REQUEST_RECIPES });

const getRecipes = (recipes) => ({ type: GET_RECIPES, payload: recipes });

const fetchSearchRecipes = () => (
  (dispatch, getState) => {
    const { search } = getState();
    dispatch(requestRecipes());
    return fetchApi(search)
      .then((json) => dispatch(getRecipes(json)));
  }
);

export default fetchSearchRecipes;
