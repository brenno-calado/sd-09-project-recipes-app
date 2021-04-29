const categoriesfetchApi = async () => {
  if (window.location.pathname === '/comidas') {
    console.log('comidas');
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const json = await response.json();
    console.log(json);
    return json.meals;
  }

  if (window.location.pathname === '/bebidas') {
    console.log('bebidas');
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const json = await response.json();
    return json.drinks;
  }
};

export default categoriesfetchApi;
