import {
  SUCCESS_RANDOM_RECOMMENDED,
  SUCESS_EXPLORE,
  SUCESS_AREA,
  FROM_EXPLORE,
  FETCHING_EXPLORE,
  SUCCESS_FETCH_BY_AREA,
} from './actionTypes';

import { failureFetch } from './index';

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

const fetchingExplore = () => ({
  type: FETCHING_EXPLORE,
});

const successFetchByArea = (data) => ({
  type: SUCCESS_FETCH_BY_AREA,
  data,
});

export function recipeSurpriseThunk(type) {
  return (dispatch) => {
    dispatch(fetchingExplore());

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
    dispatch(fetchingExplore());
    return fetchIngredientsMeals()
      .then((data) => dispatch(successExplore(data)))
      .catch((error) => dispatch(failureFetch(error)));
  };
}

export function exploreByAreaThunk() {
  return (dispatch) => {
    dispatch(fetchingExplore());
    return fetchAreaMeals()
      .then((data) => dispatch(successArea(data)))
      .catch((error) => dispatch(failureFetch(error)));
  };
}

export function exploreByIngredientCocktailsThunk() {
  return (dispatch) => {
    dispatch(fetchingExplore());
    return fetchIngredientsCocktails()
      .then((data) => dispatch(successExplore(data)))
      .catch((error) => dispatch(failureFetch(error)));
  };
}

export function getMealsByAreaThunk(area) {
  return (dispatch) => {
    dispatch(fetchingExplore());
    return fetchByArea(area)
      .then((data) => dispatch(successFetchByArea(data)))
      .catch((error) => dispatch(failureFetch(error)));
  };
}

export function allMealsThunk() {
  return (dispatch) => {
    dispatch(fetchingExplore());
    return fetchInitialMeals()
      .then((data) => dispatch(successFetchByArea(data)))
      .catch((error) => dispatch(failureFetch(error)));
  };
}

export const fromExplore = (bool) => ({
  type: FROM_EXPLORE,
  bool,
});
