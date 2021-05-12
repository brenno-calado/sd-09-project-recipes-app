import { requestMeals } from './meals';
import { requestCocktails } from './cocktails';
import { sendIngredients } from './ingredients';
import { addUser } from './user';
import {
  fetchMealsAPI,
  fetchCocktailAPI,
  fetchMealsAPIbyName,
  fetchMealsAPIbyLetter,
  fetchMealsAPIbyIngredient,
  fetchFoodByArea,
  fetchCocktailAPIbyName,
  fetchCocktailAPIbyLetter,
  fetchCocktailAPIbyIngredient,
} from '../../services/ApiRequest';

export {
  sendIngredients,
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

export const requestApiMealsbyName = (input) => async (dispatch) => {
  dispatch(requestMeals());
  try {
    const response = await fetchMealsAPIbyName(input);
    return dispatch(requestMeals(response.meals));
  } catch (error) {
    return console.log(error);
  }
};

export const requestApiMealsbyLetter = (input) => async (dispatch) => {
  dispatch(requestMeals());
  try {
    const response = await fetchMealsAPIbyLetter(input);
    return dispatch(requestMeals(response.meals));
  } catch (error) {
    return console.log(error);
  }
};

export const requestApiMealsIngredient = (input) => async (dispatch) => {
  dispatch(requestMeals());
  try {
    const response = await fetchMealsAPIbyIngredient(input);
    return dispatch(requestMeals(response.meals));
  } catch (error) {
    return console.log(error);
  }
};

export const requestApiMealsArea = (input) => async (dispatch) => {
  console.log(input);
  dispatch(requestMeals());

  try {
    const response = await fetchFoodByArea(input);
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

export const requestApiCocktailsbyName = (input) => async (dispatch) => {
  dispatch(requestCocktails());
  try {
    const response = await fetchCocktailAPIbyName(input);
    return dispatch(requestCocktails(response.drinks));
  } catch (error) {
    return console.log(error);
  }
};

export const requestApiCocktailsbyLetter = (input) => async (dispatch) => {
  dispatch(requestCocktails());
  try {
    const response = await fetchCocktailAPIbyLetter(input);
    return dispatch(requestCocktails(response.drinks));
  } catch (error) {
    return console.log(error);
  }
};

export const requestApiCocktailsbyIngredient = (input) => async (dispatch) => {
  dispatch(requestCocktails());
  try {
    const response = await fetchCocktailAPIbyIngredient(input);
    return dispatch(requestCocktails(response.drinks));
  } catch (error) {
    return console.log(error);
  }
};

export const addObj = (obj) => ({
  type: 'ADD_obj',
  obj,
});
