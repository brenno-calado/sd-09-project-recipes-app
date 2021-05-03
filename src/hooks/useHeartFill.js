import { useEffect, useState } from 'react';
import { getIdFromURL } from '../services/others';

function searchAndFillInitial() {
  const allFavoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const recipeId = getIdFromURL();
  let recipeIsFavorite = false;
  let foundInFavorites;
  if (allFavoritesRecipes) {
    foundInFavorites = allFavoritesRecipes.find((recipes) => recipes.id === recipeId);
  }
  if (foundInFavorites) {
    recipeIsFavorite = true;
  }
  return recipeIsFavorite;
}

function useHeartFill() {
  const [hearthFill, setHeartFill] = useState(searchAndFillInitial());
  const [shouldVerifyToFillHeart, setShouldVerifyToFillHeart] = useState(true);

  useEffect(() => {
    let recipeIsFavorite = false;
    function searchAndFill() {
      const allFavoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const recipeId = getIdFromURL();
      let foundInFavorites;
      if (allFavoritesRecipes) {
        foundInFavorites = allFavoritesRecipes.find((recipes) => recipes.id === recipeId);
      }
      if (foundInFavorites) {
        recipeIsFavorite = true;
      }
      setHeartFill(recipeIsFavorite);
    }
    if (shouldVerifyToFillHeart) {
      searchAndFill();
      setShouldVerifyToFillHeart(false);
    }
  }, [shouldVerifyToFillHeart]);

  return [hearthFill, setShouldVerifyToFillHeart];
}

export default useHeartFill;
