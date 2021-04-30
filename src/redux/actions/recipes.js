import types from '../types';
import fetchApi from '../../services/api';

const { GET_RECIPES, REQUEST_RECIPES } = types;

const requestRecipes = () => ({ type: REQUEST_RECIPES });

const getRecipes = ({ meals }) => ({ type: GET_RECIPES, payload: meals });

const fetchSearchRecipes = () => (
  (dispatch, getState) => {
    console.log(getState());
    const { search } = getState();
    dispatch(requestRecipes());
    return fetchApi(search)
      .then((json) => dispatch(getRecipes(json)));
  }
);

export default fetchSearchRecipes;
