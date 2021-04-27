const fetchRecipes = async (endPoint) => {
  if (window.location.pathname === '/comidas') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${endPoint}`);
    const json = await response.json();
    return json;
  }
  if (window.location.pathname === '/bebidas') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${endPoint}`);
    const json = await response.json();
    return json;
  }
};

export default fetchRecipes;
