const END_POINT_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const END_POINT_CATEGORIES_MEALS = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const END_POINT_BY_CATEGORY_MEALS = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

const END_POINT_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const END_POINT_CATEGORIES_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const END_POINT_BY_CATEGORY_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

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
