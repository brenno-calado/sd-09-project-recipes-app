export const fetchDrinksAPI = async () => {
  const myRecipes = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((data) => data.json());
  return myRecipes.drinks;
};

export const fetchDrinksCategoriesAPI = async () => {
  const myRecipes = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((data) => data.json());
  return myRecipes.drinks;
};

export const fetchDrinksCategoryAPI = async (category) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((data) => data.json());
  return request.drinks;
};
