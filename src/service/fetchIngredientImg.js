const fetchIngredientImg = async (ingredientName) => {
  if (window.location.pathname === '/explorar/comidas/ingredientes') {
    const response = await fetch(`https://www.themealdb.com/images/ingredients/${ingredientName}.png`);
    return response.url;
  }

  if (window.location.pathname === '/explorar/bebidas/ingredientes') {
    const response = await fetch(`https://www.thecocktaildb.com/images/ingredients/${ingredientName}.png`);
    return response.url;
  }
};

export default fetchIngredientImg;
