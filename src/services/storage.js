export const saveTokens = () => {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
};

export const saveUser = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const saveFavoriteRecipe = (recipe) => {
  const existingRecipes = localStorage.getItem('favoriteRecipes') || '[]';
  const parsedRecipes = JSON.parse(existingRecipes);
  localStorage.setItem('favoriteRecipes', JSON.stringify([...parsedRecipes, recipe]));
};

export const removeRecipeFromFavorites = (id, type) => {
  const existingRecipes = localStorage.getItem('favoriteRecipes') || '[]';
  const parsedRecipes = JSON.parse(existingRecipes);
  const remainingRecipes = parsedRecipes
    .filter((recipe) => recipe.id !== id && recipe.type !== type);
  localStorage.setItem('favoriteRecipes', JSON.stringify(remainingRecipes));
};

export const saveDoneRecipe = (recipe) => {
  const existingRecipes = localStorage.getItem('doneRecipes') || '[]';
  const parsedRecipes = JSON.parse(existingRecipes);
  localStorage.setItem('doneRecipes', JSON.stringify([...parsedRecipes, recipe]));
};

export const saveProgress = (recipe) => {
  const existingRecipes = localStorage.getItem('inProgressRecipes') || '[]';
  const parsedRecipes = JSON.parse(existingRecipes);
  localStorage.setItem('inProgressRecipes', JSON.stringify([...parsedRecipes, recipe]));
};
