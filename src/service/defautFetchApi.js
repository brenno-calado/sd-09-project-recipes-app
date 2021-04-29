const fetchDefaultApi = async () => {
  if (window.location.pathname === '/comidas') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const json = await response.json();
    return json.meals;
  }

  if (window.location.pathname === '/bebidas') {
    console.log('bebidas');
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const json = await response.json();
    return json.drinks;
  }
};

export default fetchDefaultApi;
