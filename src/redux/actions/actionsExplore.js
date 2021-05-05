import {
  SUCCESS_RANDOM_RECOMMENDED,
  SUCESS_EXPLORE,
  SUCESS_AREA,
} from './actionTypes';

import { sucessFetch, failureFetch, fetching } from './index';

import {
  fetchInitialMeals,
  fetchRandomMeals,
  fetchIngredientsMeals,
  fetchAreaMeals,
  fetchByArea,
} from '../../services/mealsAPI';

import {
  fetchRandomCocktails,
  fetchIngredientsCocktails,
} from '../../services/cocktailsAPI';

const successRandomRecommended = (data) => ({
  type: SUCCESS_RANDOM_RECOMMENDED,
  data,
});

const successExplore = (data) => ({
  type: SUCESS_EXPLORE,
  data,
});

const successArea = (data) => ({
  type: SUCESS_AREA,
  data,
});

export function recipeSurpriseThunk(type) {
  return (dispatch) => {
    dispatch(fetching());

    if (type === 'comidas') {
      return fetchRandomMeals()
        .then((data) => dispatch(successRandomRecommended(data)))
        .catch((error) => dispatch(failureFetch(error)));
    }
    if (type === 'bebidas') {
      return fetchRandomCocktails()
        .then((data) => dispatch(successRandomRecommended(data)))
        .catch((error) => dispatch(failureFetch(error)));
    }
  };
}

export function exploreByIngredientMealsThunk() {
  return (dispatch) => {
    dispatch(fetching());
    return fetchIngredientsMeals()
      .then((data) => dispatch(successExplore(data)))
      .catch((error) => dispatch(failureFetch(error)));
  };
}

export function exploreByAreaThunk() {
  return (dispatch) => {
    dispatch(fetching());
    return fetchAreaMeals()
      .then((data) => dispatch(successArea(data)))
      .catch((error) => dispatch(failureFetch(error)));
  };
}

export function exploreByIngredientCocktailsThunk() {
  return (dispatch) => {
    dispatch(fetching());
    return fetchIngredientsCocktails()
      .then((data) => dispatch(successExplore(data)))
      .catch((error) => dispatch(failureFetch(error)));
  };
}

export function getMealsByAreaThunk(area) {
  return (dispatch) => {
    dispatch(fetching());
    return fetchByArea(area)
      .then((data) => dispatch(sucessFetch(data)))
      .catch((error) => dispatch(failureFetch(error)));
  };
}

export function allMealsThunk() {
  return (dispatch) => {
    dispatch(fetching());
    return fetchInitialMeals()
      .then((data) => dispatch(sucessFetch(data)))
      .catch((error) => dispatch(failureFetch(error)));
  };
}
