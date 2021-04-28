export const fetchFoodsAPI = async () => {
  const myRecipes = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((data) => data.json());
  return myRecipes.meals;
};

export const fetchFoodsCategoryAPI = async () => {
  const myRecipes = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((data) => data.json());
  return myRecipes.meals;
};
