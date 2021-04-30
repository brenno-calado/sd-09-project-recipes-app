const drinksAPI = 'https://www.thecocktaildb.com/api/json/v1/1/';
const allDrinksAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const allDrinksCategoriesAPI = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const drinksByCategoryAPI = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export const fetchAllDrinks = async () => {
  const result = fetch(allDrinksAPI)
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);
  return result;
};

export const fetchCategoryDrinks = async () => {
  const result = fetch(allDrinksCategoriesAPI)
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);
  return result;
};

export const fetchSearchDrinks = async (filter, text) => {
  const URL = `${drinksAPI}${filter === 'i' ? 'filter' : 'search'}.php?${filter}=${text}`;
  const search = fetch(URL)
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);
  return search;
};

export const fetchDrinksByCategory = async (strCategory) => {
  const URL = `${drinksByCategoryAPI}${strCategory}`;
  const search = await fetch(URL)
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);
  return search;
};