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
  const maxMealsNumber = 12;
  if (meals === null) return 'null';
  if (meals.length >= maxMealsNumber) return meals.slice(0, maxMealsNumber);
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
  const maxDrinksNumber = 12;
  if (drinks === null) return 'null';
  if (drinks.length >= maxDrinksNumber) return drinks.slice(0, maxDrinksNumber);
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
  const maxMealsNumber = 12;
  const { meals } = await fetch(url).then((response) => response.json());
  return meals.slice(0, maxMealsNumber);
};

export const getDrinksFromCategory = async (category) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const maxDrinksNumber = 12;
  const { drinks } = await fetch(url).then((response) => response.json());
  return drinks.slice(0, maxDrinksNumber);
};
