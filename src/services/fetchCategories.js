export const fetchDrinksCategories = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const request = await fetch(endpoint);
  const response = await request.json();

  return response.drinks.map(({ strCategory }) => strCategory);
};

export const fetchMealsCategories = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const request = await fetch(endpoint);
  const response = await request.json();

  return response.meals.map(({ strCategory }) => strCategory);
};

export const fetchByCategory = async (recipeType, category) => {
  try {
    const endpoint = recipeType === 'Drinks'
      ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
      : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const request = await fetch(endpoint);
    const response = await request.json();

    return response[recipeType.toLowerCase()];
  } catch (error) {
    console.log(error);
    return [];
  }
};
