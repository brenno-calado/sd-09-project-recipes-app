import { requestMeals } from './meals';
import { requestCocktails } from './cocktails';
import { addUser } from './user';
import { fetchMealsAPI, fetchCocktailAPI } from '../../services/ApiRequest';

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

export const requestApiCocktails = () => async (dispatch) => {
  dispatch(requestCocktails());
  try {
    const response = await fetchCocktailAPI();
    return dispatch(requestCocktails(response.drinks));
  } catch (error) {
    return console.log(error);
  }
};
