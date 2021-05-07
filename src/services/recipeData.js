function getIngredients(recipeData) {
  if (!recipeData) { return ['Carregando']; }
  const ingredients = Object.entries(recipeData)
    .filter((element) => element[0].includes('strIngredient'))
    .filter((element) => element[1] !== '' && element[1] !== null)
    .map((element) => element[1]);

  return ingredients;
}

export default getIngredients;
