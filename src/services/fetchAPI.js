function fetchAPI(searchType, n) {
  // const idEndPoint = `https://themealdb.com/api/json/v1/1/lookup.php?i=${n}`;
  const firstLetterEndPoint = `https://themealdb.com/api/json/v1/1/search.php?f=${n}`;
  const nameEndPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${n}`;
  const ingredientEndPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${n}`;

  switch (searchType) {
  case 'firstLetter':
    fetch(firstLetterEndPoint)
      .then((promise) => promise.json()
        .then((response) => console.log(response)));
    break;
  case 'name':
    fetch(nameEndPoint)
      .then((promise) => promise.json()
        .then((response) => console.log(response)));
    break;
  case 'ingrediente':
    fetch(ingredientEndPoint)
      .then((promise) => promise.json()
        .then((response) => console.log(response)));
    break;

  default:
    break;
  }
}

export default fetchAPI;
