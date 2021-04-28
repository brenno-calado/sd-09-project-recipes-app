export async function fetchMealsAPI() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const meals = await response.json();
  return meals;
}

export async function fetchMealsAPIbyName(input) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
  const meals = await response.json();
  return meals;
}

export async function fetchMealsAPIbyLetter(input) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`);
  const meals = await response.json();
  return meals;
}

export async function fetchMealsAPIbyIngredient(input) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`);
  const meals = await response.json();
  return meals;
}

export async function fetchCocktailAPI() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const cocktails = await response.json();
  return cocktails;
}

export async function fetchCocktailAPIbyName(input) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`);
  const meals = await response.json();
  return meals;
}

export async function fetchCocktailAPIbyLetter(input) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`);
  const meals = await response.json();
  return meals;
}

export async function fetchCocktailAPIbyIngredient(input) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`);
  const meals = await response.json();
  return meals;
}
