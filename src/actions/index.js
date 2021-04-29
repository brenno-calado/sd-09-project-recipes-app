export const LOGIN = 'LOGIN';
export const GET_MEALS = 'GET_MEALS';
export const GET_CATEGORIES_MEALS = 'GET_CATEGORIES_MEALS';
export const SEARCH_MEALS = 'SEARCH_MEALS';
export const GET_DRINKS = 'GET_DRINKS';
export const GET_CATEGORIES_DRINKS = 'GET_CATEGORIES_DRINKS';
export const SEARCH_DRINKS = 'SEARCH_DRINKS';

export const loginUser = (email) => ({
  type: LOGIN,
  email,
});

export const listMeals = (meals) => ({
  type: GET_MEALS,
  meals,
});

export const categoriesMeals = (categories) => ({
  type: GET_CATEGORIES_MEALS,
  categories,
});

export const searchMeals = (meals) => ({
  type: SEARCH_MEALS,
  meals,
});

export const listDrinks = (drinks) => ({
  type: GET_DRINKS,
  drinks,
});

export const categoriesDrinks = (categories) => ({
  type: GET_CATEGORIES_DRINKS,
  categories,
});

export const searchDrinks = (drinks) => ({
  type: SEARCH_DRINKS,
  drinks,
});
