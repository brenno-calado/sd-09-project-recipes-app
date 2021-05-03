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
