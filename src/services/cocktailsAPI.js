export const cocktailsByIngredient = (ingredient) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.drinks);
};

export const cocktailsByName = (name) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.drinks);
};

export const cocktailsByFirstLetter = (firstLetter) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.drinks);
};

export const fetchCocktailsCategories = () => {
  const mealsURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  return fetch(mealsURL)
    .then((response) => response.json())
    .then((data) => data.drinks);
};

export const fetchInitialCocktails = () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.drinks);
};

export const fetchCocktailsByCategory = (category) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.drinks);
};

export const fetchCocktailsById = (id) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.drinks);
};

export const fetchRandomCocktails = () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.drinks);
};

export const fetchIngredientsCocktails = () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.drinks);
};
