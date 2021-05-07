const fetchIngredients = async () => {
  if (window.location.pathname === '/explorar/comidas/ingredientes') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const json = await response.json();
    return json.meals;
  }

  if (window.location.pathname === '/explorar/bebidas/ingredientes') {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const json = await response.json();
    return json.drinks;
  }
};

export default fetchIngredients;
