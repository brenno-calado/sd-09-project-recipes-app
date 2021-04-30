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

export const fetchRecipeDetails = async (idType, id) => {
  const url = (idType === 'meals')
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const request = await fetch(url);
  const response = await request.json();
  const type = Object.keys(response);
  return response[type][0];
};

// export default fetchRecipes;
