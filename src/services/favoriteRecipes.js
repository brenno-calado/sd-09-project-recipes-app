const loadFavoriteRecipesFromLocalStorage = () => (
  JSON.parse(localStorage.getItem('favoriteRecipes'))
);

const removeFavoriteRecipesFromLocalStorageById = (id) => {
  const favoriteRecipes = loadFavoriteRecipesFromLocalStorage();
  const newfavoriteRecipes = favoriteRecipes
    .filter((favoriteRecipe) => favoriteRecipe.id !== id.toString());
  localStorage.setItem('favoriteRecipes', JSON.stringify(newfavoriteRecipes));
};

const saveFavoriteRecipesInLocalStorage = (favoriteRecipe) => {
  let favoriteRecipes = loadFavoriteRecipesFromLocalStorage();
  favoriteRecipes = favoriteRecipes === null ? [] : favoriteRecipes;
  localStorage.setItem('favoriteRecipes',
    JSON.stringify(favoriteRecipes.concat(favoriteRecipe)));
};

const getFavoriteRecipesFromLocalStorageById = (id) => {
  try {
    return loadFavoriteRecipesFromLocalStorage()
      .some((favoriteRecipe) => favoriteRecipe.id === id.toString());
  } catch (error) {
    return false;
  }
};

export {
  saveFavoriteRecipesInLocalStorage,
  loadFavoriteRecipesFromLocalStorage,
  getFavoriteRecipesFromLocalStorageById,
  removeFavoriteRecipesFromLocalStorageById,
};
