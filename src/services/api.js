const recipeType = (meals = false) => (meals ? 'meals' : 'drinks');
const apiUrl = (meals = false) => (meals ? 'https://www.themealdb.com/api/json/v1/1' : 'https://www.thecocktaildb.com/api/json/v1/1');

const fetchData = (url) => fetch(url).then((res) => res.json())
  .catch((error) => console.log(error));

export function getRecipesByIngredient(ingredient, meals = false) {
  const url = `${apiUrl(meals)}/filter.php?i=${ingredient}`;
  return fetchData(url).then((res) => res[recipeType(meals)]);
}

export function getRecipesByName(name, meals = false) {
  const url = `${apiUrl(meals)}/search.php?s=${name}`;
  return fetchData(url).then((res) => res[recipeType(meals)]);
}

export function getRecipesByFirstLetter(letter, meals = false) {
  const url = `${apiUrl(meals)}/search.php?f=${letter}`;
  return fetchData(url).then((res) => res[recipeType(meals)]);
}

export function getCategories(meals = false) {
  const url = `${apiUrl(meals)}/list.php?c=list`;
  return fetchData(url).then((res) => res[recipeType(meals)]);
}

export function getRecipesByCategory(category, meals) {
  const url = `${apiUrl(meals)}/filter.php?c=${category}`;
  return fetchData(url).then((res) => res[recipeType(meals)]);
}

export function getRecipesById(id, meals) {
  const url = `${apiUrl(meals)}/lookup.php?i=${id}`;
  return fetchData(url).then((res) => res[recipeType(meals)]);
}

const getIngredientsAndMeasure = (recipe) => {
  const ingredientsList = [];
  const MAX_ITEMS = 20;
  for (let i = 1; i <= MAX_ITEMS; i += 1) {
    const newItem = {
      ingredient: recipe[`strIngredient${i}`],
      measure: recipe[`strMeasure${i}`],
    };
    if (newItem.ingredient === null || newItem.ingredient.length === 0) break;
    ingredientsList.push(newItem);
  }
  return ingredientsList;
};

export async function getRecipeAndParseById(id, meals = false) {
  const url = `${apiUrl(meals)}/lookup.php?i=${id}`;
  const recipe = await fetchData(url).then((res) => res[recipeType(meals)][0]);
  const ingredients = getIngredientsAndMeasure(recipe);
  const str = meals ? 'Meal' : 'Drink';
  return {
    ingredients,
    id: recipe[`id${str}`],
    type: meals ? 'comida' : 'bebida',
    area: recipe.strArea || '',
    category: recipe.strCategory,
    // alcoholicOrNot: recipe.strAlcoholic ? 'Alcoholic' : '',
    alcoholic: recipe.strAlcoholic,
    name: recipe[`str${str}`],
    image: recipe[`str${str}Thumb`],
    instructions: recipe.strInstructions,
    video: recipe.strYoutube,
  };
}
