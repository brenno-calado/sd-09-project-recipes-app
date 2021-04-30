export const fetchFoodsAPI = async () => {
  const myRecipes = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((data) => data.json());
  return myRecipes.meals;
};

export const fetchFoodsCategoriesAPI = async () => {
  const myRecipes = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((data) => data.json());
  return myRecipes.meals;
};

export const fetchFoodsCategoryAPI = async (category) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((data) => data.json());
  return request.meals;
};

export const fetchSingleRecipeAPI = async (id) => {
  const recipe = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((data) => data.json());
  return recipe.meals;
};
