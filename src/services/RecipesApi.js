async function searchApi(typeRecipe, typeSearch, itemSearch) {
  let url;

  if (typeRecipe === 'comidas') {
    switch (typeSearch) {
    case 'ingredient':
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${itemSearch}`;
      break;
    case 'name':
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${itemSearch}`;
      break;
    default:
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${itemSearch}`;
      break;
    }
  } else {
    switch (typeSearch) {
    case 'ingredient':
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${itemSearch}`;
      break;
    case 'name':
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${itemSearch}`;
      break;
    default:
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${itemSearch}`;
      break;
    }
  }

  const recipesSearch = await fetch(url)
    .then((response) => response.json()
      .then((data) => data));

  if (typeRecipe === 'comidas') {
    return recipesSearch.meals;
  }

  return recipesSearch.drinks;
}

export default searchApi;
