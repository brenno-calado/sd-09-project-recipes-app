async function searchCategories(typeRecipe) {
  let url;

  if (typeRecipe === 'comidas') {
    url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  } else {
    url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  }
  const categoriesSearch = await fetch(url)
    .then((response) => response.json()
      .then((data) => data));

  if (typeRecipe === 'comidas') {
    if (categoriesSearch.meals === null) {
      return [];
    }
    return categoriesSearch.meals;
  }
  if (categoriesSearch.drinks === null) {
    return [];
  }
  return categoriesSearch.drinks;
}

export default searchCategories;
