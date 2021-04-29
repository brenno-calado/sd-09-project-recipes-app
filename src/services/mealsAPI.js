export const fetchByIngredient = (ingredient) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.meals);
};

export const fetchByName = (name) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.meals);
};

export const fetchByFirstLetter = (firstLetter) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.meals);
};

export const fetchMealsCategories = () => {
  const mealsURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  return fetch(mealsURL)
    .then((response) => response.json())
    .then((data) => data.meals);
};

export const fetchInitialMeals = () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.meals);
};

export const fetchMealsByCategory = (category) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.meals);
};

export const fetchMealsById = (id) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.meals);
};
