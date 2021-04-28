export const LOGIN = 'LOGIN';
export const GET_RECIPES = 'GET_RECIPES';
export const SEARCH_RECIPES = 'SEARCH_RECIPES';
export const GET_DRINKS = 'GET_DRINKS';
export const SEARCH_DRINKS = 'SEARCH_DRINKS';

export const loginUser = (email) => ({
  type: LOGIN,
  email,
});

export const listRecipes = (recipes) => ({
  type: GET_RECIPES,
  recipes,
});

export const searchRecipes = (recipes) => ({
  type: SEARCH_RECIPES,
  recipes,
});

export const listDrink = (drinks) => ({
  type: GET_DRINKS,
  drinks,
});

export const searchDrink = (drinks) => ({
  type: SEARCH_DRINKS,
  drinks,
});
