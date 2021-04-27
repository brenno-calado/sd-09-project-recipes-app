const fetchDrinksAPI = async () => {
  const myRecipes = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((data) => data.json());
  return myRecipes.drinks;
};

export default fetchDrinksAPI;
