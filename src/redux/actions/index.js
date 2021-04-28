import { requestMeals } from './meals';
import { requestCocktails } from './cocktails';
import { addUser } from './user';
import {
  fetchMealsAPI,
  fetchCocktailAPI,
  fetchMealsAPIbyName,
  fetchMealsAPIbyLetter,
  fetchMealsAPIbyIngredient,
  fetchCocktailAPIbyName,
  fetchCocktailAPIbyLetter,
  fetchCocktailAPIbyIngredient,
} from '../../services/ApiRequest';

export {
  requestCocktails,
  requestMeals,
  addUser,
};

export const requestApiMeals = () => async (dispatch) => {
  dispatch(requestMeals());
  try {
    const response = await fetchMealsAPI();
    return dispatch(requestMeals(response.meals));
  } catch (error) {
    return console.log(error);
  }
};

export const requestApiMealsbyName = () => async (dispatch) => {
  dispatch(requestMeals());
  try {
    const response = await fetchMealsAPIbyName();
    return dispatch(requestMeals(response.meals));
  } catch (error) {
    return console.log(error);
  }
};

export const requestApiMealsbyLetter = () => async (dispatch) => {
  dispatch(requestMeals());
  try {
    const response = await fetchMealsAPIbyLetter();
    return dispatch(requestMeals(response.meals));
  } catch (error) {
    return console.log(error);
  }
};

export const requestApiMealsIngredient = () => async (dispatch) => {
  dispatch(requestMeals());
  try {
    const response = await fetchMealsAPIbyIngredient();
    return dispatch(requestMeals(response.meals));
  } catch (error) {
    return console.log(error);
  }
};

export const requestApiCocktails = () => async (dispatch) => {
  dispatch(requestCocktails());
  try {
    const response = await fetchCocktailAPI();
    return dispatch(requestCocktails(response.drinks));
  } catch (error) {
    return console.log(error);
  }
};

export const requestApiCocktailsbyName = () => async (dispatch) => {
  dispatch(requestCocktails());
  try {
    const response = await fetchCocktailAPIbyName();
    return dispatch(requestCocktails(response.drinks));
  } catch (error) {
    return console.log(error);
  }
};

export const requestApiCocktailsbyLetter = () => async (dispatch) => {
  dispatch(requestCocktails());
  try {
    const response = await fetchCocktailAPIbyLetter();
    return dispatch(requestCocktails(response.drinks));
  } catch (error) {
    return console.log(error);
  }
};

export const requestApiCocktailsbyIngredient = () => async (dispatch) => {
  dispatch(requestCocktails());
  try {
    const response = await fetchCocktailAPIbyIngredient();
    return dispatch(requestCocktails(response.drinks));
  } catch (error) {
    return console.log(error);
  }
};


