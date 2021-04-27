export const fetchFoodsAPI = async () => {
  const myRecipes = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((data) => data.json());
  return myRecipes.meals;
};

export const randomFoodAPI = async () => {
  const myRandomMeal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((recipe) => recipe.json());
  return myRandomMeal.meals;
};
