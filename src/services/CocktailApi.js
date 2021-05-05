export async function fetchCocktailApi({ searchText, filter }) {
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

export async function fetchCocktailsCategories() {
  const apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((data) => data.json());
  return apiResponse.drinks;
}

export async function fetchCocktailsByCategory(category) {
  const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((data) => data.json());
  return apiResponse.drinks;
}

export async function fetchDrinksWithId(id) {
  const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((data) => data.json());
  return apiResponse.drinks;
}

export async function fetchDrinksRecomendation() {
  const apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((data) => data.json());
  return apiResponse.drinks;
}
