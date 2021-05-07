function getIngredientsDone(id) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return inProgressRecipes.cocktails[id] || inProgressRecipes.meals[id];
}

export default getIngredientsDone;
