const END_POINT_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const END_POINT_CATEGORIES_MEALS = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const END_POINT_BY_CATEGORY_MEALS = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const END_POINT_BY_INGREDIENTS_MEALS = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const END_POINT_BY_FIRST_LETTER_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

const END_POINT_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const END_POINT_CATEGORIES_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const END_POINT_BY_CATEGORY_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const END_POINT_BY_INGREDIENTS_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const END_POINT_BY_FIRST_LETTER_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

const END_POINT_AREA_MEALS = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const END_POINT_BY_AREA_MEALS = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

export const requestMeals = async () => {
  const requestFech = await fetch(END_POINT_MEALS);
  const requestJson = await requestFech.json();
  return requestJson;
};

export const requestDrinks = async () => {
  const requestFech = await fetch(END_POINT_DRINKS);
  const requestJson = await requestFech.json();
  return requestJson;
};

export const requestCategoriesMeals = async () => {
  const requestFech = await fetch(END_POINT_CATEGORIES_MEALS);
  const requestJson = await requestFech.json();
  return requestJson;
};

export const requestCategoriesDrinks = async () => {
  const requestFech = await fetch(END_POINT_CATEGORIES_DRINKS);
  const requestJson = await requestFech.json();
  return requestJson;
};

export const requestMealsByCategory = async (category) => {
  const requestFech = await fetch(`${END_POINT_BY_CATEGORY_MEALS}${category}`);
  const requestJson = await requestFech.json();
  return requestJson;
};

export const requestDrinksByCategory = async (category) => {
  const requestFech = await fetch(`${END_POINT_BY_CATEGORY_DRINKS}${category}`);
  const requestJson = await requestFech.json();
  return requestJson;
};

export const requestMealsByIngredients = async (ingredients) => {
  const requestFech = await fetch(`${END_POINT_BY_INGREDIENTS_MEALS}${ingredients}`);
  const requestJson = await requestFech.json();
  return requestJson;
};

export const requestDrinksByIngredients = async (ingredients) => {
  const requestFech = await fetch(`${END_POINT_BY_INGREDIENTS_DRINKS}${ingredients}`);
  const requestJson = await requestFech.json();
  return requestJson;
};

export const requestMealsByName = async (name) => {
  const requestFech = await fetch(`${END_POINT_MEALS}${name}`);
  const requestJson = await requestFech.json();
  return requestJson;
};

export const requestDrinksByName = async (name) => {
  const requestFech = await fetch(`${END_POINT_DRINKS}${name}`);
  const requestJson = await requestFech.json();
  return requestJson;
};

export const requestMealsByFirstLetter = async (letter) => {
  const requestFech = await fetch(`${END_POINT_BY_FIRST_LETTER_MEALS}${letter}`);
  const requestJson = await requestFech.json();
  return requestJson;
};

export const requestDrinksByFirstLetter = async (letter) => {
  const requestFech = await fetch(`${END_POINT_BY_FIRST_LETTER_DRINKS}${letter}`);
  const requestJson = await requestFech.json();
  return requestJson;
};

export const requestAreaMeals = async () => {
  const requestFech = await fetch(END_POINT_AREA_MEALS);
  const requestJson = await requestFech.json();
  return requestJson;
};

export const requestMealsByArea = async (area) => {
  const requestFech = await fetch(`${END_POINT_BY_AREA_MEALS}${area}`);
  const requestJson = await requestFech.json();
  return requestJson;
};
