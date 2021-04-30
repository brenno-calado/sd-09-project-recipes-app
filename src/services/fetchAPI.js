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
