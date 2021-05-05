async function searchByCategory(typeRecipe, category) {
  let url;

  if (typeRecipe === 'comidas') {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  } else {
    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  }

  const categoriesBySearch = await fetch(url)
    .then((response) => response.json()
      .then((data) => data));

  if (typeRecipe === 'comidas') {
    if (categoriesBySearch.meals === null) {
      return [];
    }
    return categoriesBySearch.meals;
  }
  if (categoriesBySearch.drinks === null) {
    return [];
  }
  return categoriesBySearch.drinks;
}

export default searchByCategory;
