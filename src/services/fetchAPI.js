export function mealAPI(searchType, n) {
  const firstLetterEndPoint = `https://themealdb.com/api/json/v1/1/search.php?f=${n}`;
  const nameEndPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${n}`;
  const ingredientEndPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${n}`;

  switch (searchType) {
  case 'firstLetter':
    return fetch(firstLetterEndPoint)
      .then((promise) => promise.json()
        .then((response) => response));
  case 'name':
    return fetch(nameEndPoint)
      .then((promise) => promise.json()
        .then((response) => response));
  case 'ingrediente':
    return fetch(ingredientEndPoint)
      .then((promise) => promise.json()
        .then((response) => response));
  default:
    return false;
  }
}

export function drinkAPI(searchType, n) {
  const firstLetterEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${n}`;
  const nameEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${n}`;
  const ingredientEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${n}`;

  switch (searchType) {
  case 'firstLetter':
    return fetch(firstLetterEndPoint)
      .then((promise) => promise.json()
        .then((response) => response));
  case 'name':
    return fetch(nameEndPoint)
      .then((promise) => promise.json()
        .then((response) => response));
  case 'ingrediente':
    return fetch(ingredientEndPoint)
      .then((promise) => promise.json()
        .then((response) => response));
  default:
    return false;
  }
}

export function fetchToMainScreen(typeFood) {
  const endPointMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const endPointDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  if (typeFood === '/comidas') {
    return fetch(endPointMeals)
      .then((promise) => promise.json()
        .then((response) => response.meals));
  }

  if (typeFood === '/bebidas') {
    return fetch(endPointDrinks)
      .then((promise) => promise.json()
        .then((response) => response.drinks));
  }
}

export function categoriesList(typeFood) {
  const mealsCategorie = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinksCategorie = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  if (typeFood === '/comidas') {
    return fetch(mealsCategorie)
      .then((promise) => promise.json()
        .then((response) => response.meals));
  }

  if (typeFood === '/bebidas') {
    return fetch(drinksCategorie)
      .then((promise) => promise.json()
        .then((response) => response.drinks));
  }
}
