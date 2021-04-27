export const fetchDrinksAPI = async () => {
  const myRecipes = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((data) => data.json());
  return myRecipes.drinks;
};

export const randomDrinkAPI = async () => {
  const myRandomDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((recipe) => recipe.json());
  return myRandomDrink.drinks;
};
