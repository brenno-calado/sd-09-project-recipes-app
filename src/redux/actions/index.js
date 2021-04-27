import { SAVE_PATH, FETCHING, SUCCESS_FETCH, FAILURE_FETCH } from './actionTypes';
import {
  fetchByIngredient,
  fetchByName,
  fetchByFirstLetter,
} from '../../services/mealsAPI';
import {
  cocktailsByIngredient,
  cocktailsByName,
  cocktailsByFirstLetter,
} from '../../services/cocktailsAPI';

export const savePath = (pathname) => ({
  type: SAVE_PATH,
  pathname,
});

const fetching = () => ({
  type: FETCHING,
});

const sucessFetch = (data) => ({
  type: SUCCESS_FETCH,
  data,
});

const failureFetch = (error) => ({
  type: FAILURE_FETCH,
  error,
});

export function mealsThunk(typeSearch, textSearch) {
  return (dispatch) => {
    dispatch(fetching());
    if (typeSearch === 'ingredient-search') {
      return fetchByIngredient(textSearch)
        .then((data) => dispatch(sucessFetch(data)))
        .catch((error) => dispatch(failureFetch(error)));
    }
    if (typeSearch === 'name-search') {
      return fetchByName(textSearch)
        .then((data) => dispatch(sucessFetch(data)))
        .catch((error) => dispatch(failureFetch(error)));
    }
    if (typeSearch === 'first-letter-search') {
      return fetchByFirstLetter(textSearch)
        .then((data) => dispatch(sucessFetch(data)))
        .catch((error) => dispatch(failureFetch(error)));
    }
  };
}

export function cocktailsThunk(typeSearch, textSearch) {
  return (dispatch) => {
    dispatch(fetching());
    if (typeSearch === 'ingredient-search') {
      return cocktailsByIngredient(textSearch)
        .then((data) => dispatch(sucessFetch(data)))
        .catch((error) => dispatch(failureFetch(error)));
    }
    if (typeSearch === 'name-search') {
      return cocktailsByName(textSearch)
        .then((data) => dispatch(sucessFetch(data)))
        .catch((error) => dispatch(failureFetch(error)));
    }
    if (typeSearch === 'first-letter-search') {
      return cocktailsByFirstLetter(textSearch)
        .then((data) => dispatch(sucessFetch(data)))
        .catch((error) => dispatch(failureFetch(error)));
    }
  };
}
