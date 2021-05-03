// MEALS

export async function fetchMealsApi() {
  const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return data.meals;
}

export async function fetchMealsCategories() {
  const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return data.meals;
}

export async function fetchMealsByCategory(category) {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return data.meals;
}

export async function fetchMealsById(id) {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return data.meals;
}

// DRINKS

export async function fetchDrinksApi() {
  const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .catch((error) => console.log(error));
  return data.drinks;
}

export async function fetchDrinksCategories() {
  const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return data.drinks;
}

export async function fetchDrinksByCategory(category) {
  const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return data.drinks;
}

export async function fetchDrinkById(id) {
  const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return data.drinks;
}

// LOCAL_STORAGE

export function setInProgressStorage() {
  const defaultInProgress = {
    cocktails: {},
    meals: {},
  };
  if (localStorage.getItem('inProgressRecipes') === null) {
    return localStorage.setItem('inProgressRecipes', JSON.stringify(defaultInProgress));
  }
}
export function setFavoritesStorage() {
  if (localStorage.getItem('favoriteRecipes') === null) {
    return localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
}
export function setDoneStorage() {
  if (localStorage.getItem('doneRecipes') === null) {
    return localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
}
