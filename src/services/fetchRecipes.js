export const fetchMeals = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(endpoint);
  const response = await request.json();
  const recipesList = response.meals;

  return recipesList;
};

export const fetchBeverages = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(endpoint);
  const response = await request.json();
  const recipesList = response.drinks;

  return recipesList;
};
