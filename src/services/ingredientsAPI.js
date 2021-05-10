const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

const getIngredients = async (typeOfRecipe) => {
  const type = typeOfRecipe === 'bebidas' ? 'drinks' : 'meals';
  try {
    const ingredientsHTTP = await fetch(type === 'drinks'
      ? DRINKS_URL
      : MEALS_URL);
    if (ingredientsHTTP.ok) {
      const ingredientsJSON = await ingredientsHTTP.json();
      return ingredientsJSON[type];
    }
    throw new Error('Falha ao buscar ingredientes =(');
  } catch (e) {
    return { message: e.message };
  }
};

export default getIngredients;
