export function mealAPI(searchType, n) {
  const firstLetterEndPoint = `https://themealdb.com/api/json/v1/1/search.php?f=${n}`;
  const nameEndPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${n}`;
  const ingredientEndPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${n}`;
  const idEndPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${n}`;

  switch (searchType) {
  case 'firstLetter':
    return fetch(firstLetterEndPoint)
      .then((promise) => promise.json()
        .then((response) => response.meals));
  case 'name':
    return fetch(nameEndPoint)
      .then((promise) => promise.json()
        .then((response) => response.meals));
  case 'ingrediente':
    return fetch(ingredientEndPoint)
      .then((promise) => promise.json()
        .then((response) => response.meals));
  case 'id':
    return fetch(idEndPoint)
      .then((promise) => promise.json()
        .then((response) => response.meals));
  default:
    return false;
  }
}

export function drinkAPI(searchType, n) {
  const firstLetterEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${n}`;
  const nameEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${n}`;
  const ingredientEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${n}`;
  const idEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${n}`;

  switch (searchType) {
  case 'firstLetter':
    return fetch(firstLetterEndPoint)
      .then((promise) => promise.json()
        .then((response) => response.drinks));
  case 'name':
    return fetch(nameEndPoint)
      .then((promise) => promise.json()
        .then((response) => response.drinks));
  case 'ingrediente':
    return fetch(ingredientEndPoint)
      .then((promise) => promise.json()
        .then((response) => response.drinks));
  case 'id':
    return fetch(idEndPoint)
      .then((promise) => promise.json()
        .then((response) => response.drinks));
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

export function searchByCategory(category, typeFood) {
  const categoryEndPointMeal = (
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const categoryEndPointDrink = (
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
  );
  if (typeFood === '/comidas') {
    return fetch(categoryEndPointMeal)
      .then((promise) => promise.json()
        .then((response) => response.meals));
  }
  if (typeFood === '/bebidas') {
    return fetch(categoryEndPointDrink)
      .then((promise) => promise.json()
        .then((response) => response.drinks));
  }
}
