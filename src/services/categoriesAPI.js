const MEAL_API = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINK_API = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const getCategories = async (typeOfRecipe) => {
  const recipe = typeOfRecipe === 'bebidas' ? 'drinks' : 'meals';
  const request = await fetch(typeOfRecipe === 'bebidas' ? DRINK_API : MEAL_API);
  const response = await request.json();
  return response[recipe];
};

export default getCategories;
