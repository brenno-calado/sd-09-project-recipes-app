async function fetchCocktailApi({ searchText, filter }) {
  if (filter === 'ingredient') {
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchText}`)
      .then((data) => data.json());
    return apiResponse.drinks;
  }
  if (filter === 'name') {
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
      .then((data) => data.json());
    return apiResponse.drinks;
  }
  if (filter === 'firstLetter') {
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchText}`)
      .then((data) => data.json());
    return apiResponse.drinks;
  }
}

export default fetchCocktailApi;
