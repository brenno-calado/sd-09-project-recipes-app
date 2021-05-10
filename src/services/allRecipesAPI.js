const MEAL_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINK_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const formatIngredients = (details) => Object.keys(details)
  .filter((key) => key.includes('Ingredient') && details[key])
  .map((key) => {
    const ingredientID = key.split('strIngredient')[1];
    return `${details[key]} - ${details[`strMeasure${ingredientID}`]}`;
  });

const formatObj = (obj, typeOfRecipe) => ({
  id: obj[`id${typeOfRecipe[2]}`],
  type: typeOfRecipe[1],
  area: obj.strArea || '',
  category: obj.strCategory,
  alcoholicOrNot: obj.strAlcoholic || '',
  name: obj[`str${typeOfRecipe[2]}`],
  image: obj[`str${typeOfRecipe[2]}Thumb`],
  instructions: obj.strInstructions,
  video: obj.strYoutube,
  ingredients: formatIngredients(obj),
});

const getAllRecipes = async (typeOfRecipe) => {
  try {
    const recipe = typeOfRecipe === 'bebidas'
      ? ['drinks', 'bebida', 'Drink'] : ['meals', 'comida', 'Meal'];
    const request = await fetch(typeOfRecipe === 'bebidas' ? DRINK_API : MEAL_API);
    const response = await request.json();
    return response[recipe[0]].map((rec) => formatObj(rec, recipe));
  } catch (error) {
    throw new Error('Falha no fetch API');
  }
};

export default getAllRecipes;
