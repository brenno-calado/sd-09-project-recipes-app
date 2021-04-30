export const LOGIN = 'LOGIN';
export const GET_MEALS = 'GET_MEALS';
export const GET_CATEGORIES_MEALS = 'GET_CATEGORIES_MEALS';
export const GET_DRINKS = 'GET_DRINKS';
export const GET_CATEGORIES_DRINKS = 'GET_CATEGORIES_DRINKS';
export const GET_RANDOM_RECIPE = 'GET_RANDOM_RECIPE';
export const GET_INGREDIENTS = 'GET_INGREDIENTS';

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

export const listDrinks = (drinks) => ({
  type: GET_DRINKS,
  drinks,
});

export const categoriesDrinks = (categories) => ({
  type: GET_CATEGORIES_DRINKS,
  categories,
});

export const getRandomRecipe = (randomRecipe) => ({
  type: GET_RANDOM_RECIPE,
  randomRecipe,
});

export const getIngredients = (ingredients) => ({
  type: GET_INGREDIENTS,
  ingredients,
});
