const saveFavoriteRecipesInLocalStorage = (favoriteRecipes) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
};

export default saveFavoriteRecipesInLocalStorage;
