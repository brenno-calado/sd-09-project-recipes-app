export async function fetchMealsAPI() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const meals = await response.json();
  return meals;
}

export async function fetchCocktailAPI() {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`);
  const cocktails = await response.json();
  return cocktails;
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
