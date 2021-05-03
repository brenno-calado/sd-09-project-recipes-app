export const getFoodResults = async (radioButton, searchInput) => {
  let type = 'i';
  let searchParameter = 'filter';
  if (radioButton === 'ingredientRadio') {
    type = 'i';
    searchParameter = 'filter';
  }
  if (radioButton === 'nameRadio') {
    type = 's';
    searchParameter = 'search';
  }
  if (radioButton === 'firstLetterRadio') {
    type = 'f';
    searchParameter = 'search';
  }
  const url = `https://www.themealdb.com/api/json/v1/1/${searchParameter}.php?${type}=${searchInput}`;
  const { meals } = await fetch(url).then((response) => response.json());
  if (meals === null) return 'null';
  return meals;
};

export const getDrinkResults = async (radioButton, searchInput) => {
  let type = 'i';
  let searchParameter = 'filter';
  if (radioButton === 'ingredientRadio') {
    type = 'i';
    searchParameter = 'filter';
  }
  if (radioButton === 'nameRadio') {
    type = 's';
    searchParameter = 'search';
  }
  if (radioButton === 'firstLetterRadio') {
    type = 'f';
    searchParameter = 'search';
  }
  const url = `https://www.thecocktaildb.com/api/json/v1/1/${searchParameter}.php?${type}=${searchInput}`;
  const { drinks } = await fetch(url).then((response) => response.json());
  if (drinks === null) return 'null';
  return drinks;
};

export const getFoods = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const { meals } = await fetch(url).then((response) => response.json());
  return meals;
};

export const getDrinks = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const { drinks } = await fetch(url).then((response) => response.json());
  return drinks;
};

export const getFoodCategories = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const { meals } = await fetch(url).then((response) => response.json());
  return meals;
};

export const getDrinkCategories = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const { drinks } = await fetch(url).then((response) => response.json());
  return drinks;
};

export const getFoodsFromCategory = async (category) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const { meals } = await fetch(url).then((response) => response.json());
  return meals;
};

export const getDrinksFromCategory = async (category) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const { drinks } = await fetch(url).then((response) => response.json());
  return drinks;
};

export const getDrinkIdDetails = async (id) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { drinks } = await fetch(url).then((response) => response.json());
  return drinks[0];
};

export const getFoodIdDetails = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { meals } = await fetch(url).then((response) => response.json());
  return meals[0];
};

export const getMealAreas = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const { meals } = await fetch(url).then((response) => response.json());
  return meals;
};

export const getMealByArea = async (area) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  const { meals } = await fetch(url).then((response) => response.json());
  return meals;
};

export const getRandomMeal = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const { meals } = await fetch(url).then((response) => response.json());
  return meals[0];
};

export const getRandomDrink = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const { drinks } = await fetch(url).then((response) => response.json());
  return drinks[0];
};

export const getMealIngredients = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const { meals } = await fetch(url).then((response) => response.json());
  return meals;
};

export const getDrinkIngredients = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const { drinks } = await fetch(url).then((response) => response.json());
  return drinks;
};

export const getMealsFromIngredient = async (ingredient) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { meals } = await fetch(url).then((response) => response.json());
  return meals;
};

export const getDrinksFromIngredient = async (ingredient) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { drinks } = await fetch(url).then((response) => response.json());
  return drinks;
};
