const recommendationsFetch = async () => {
  if (window.location.pathname.includes('/bebidas')) {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const json = await response.json();
    return json.meals;
  }

  if (window.location.pathname.includes('/comidas')) {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const json = await response.json();
    return json.drinks;
  }
};

export default recommendationsFetch;
