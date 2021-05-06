export async function fetchMealsAPI() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const meals = await response.json();
  return meals;
}

export async function fetchMealsAPIbyName(nome) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
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

export async function fetchCocktailAPIbyName(nome) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
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

export async function fetchMealDetailsAPI(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const cocktails = await response.json();
  return cocktails;
}

export async function fetchDrinkDetailsAPI(id) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const cocktails = await response.json();
  return cocktails;
}

export async function fetchMealCategories() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const mealCategories = await response.json();
  return mealCategories;
}

export async function fetchCocktailsCategories() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const cocktailCategories = await response.json();
  return cocktailCategories;
}

export async function fetchExplreFoodRadom() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const cocktailCategories = await response.json();
  return cocktailCategories;
}

export async function fetchExplreDrinksRadom() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const cocktailCategories = await response.json();
  return cocktailCategories;
}

export async function fetchMealByCategory(category) {
  const response = await
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const mealByCategory = await response.json();
  return mealByCategory;
}

export async function fetchCocktailByCategory(category) {
  const response = await
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const cocktailByCategory = await response.json();
  return cocktailByCategory;
}

export async function fetchFoodIng() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const foodIng = await response.json();
  return foodIng;
}

export async function fetchCocktailIng() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const cocktailsIng = await response.json();
  return cocktailsIng;
}

export async function fetchFoodArea() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const foodArea = await response.json();
  return foodArea;
}

export async function fetchFoodByArea(area) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const mealArea = await response.json();
  return mealArea;
}
