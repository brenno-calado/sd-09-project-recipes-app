async function searchById(typeRecipe, id) {
  let url;

  if (typeRecipe === 'comidas') {
    url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  } else {
    url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  }
  const idSearch = await fetch(url)
    .then((response) => response.json()
      .then((data) => data));

  if (typeRecipe === 'comidas') {
    if (idSearch.meals === null) {
      return [];
    }
    return idSearch.meals;
  }
  if (idSearch.drinks === null) {
    return [];
  }
  return idSearch.drinks;
}

export default searchById;
