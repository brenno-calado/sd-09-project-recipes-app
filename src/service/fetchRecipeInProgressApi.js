const fetchRecipeInProgressApi = async (id) => {
  if (window.location.pathname === `/comidas/${id}/in-progress`) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await response.json();
    return json.meals;
  }

  if (window.location.pathname === `/bebidas/${id}/in-progress`) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await response.json();
    return json.drinks;
  }
};

export default fetchRecipeInProgressApi;
