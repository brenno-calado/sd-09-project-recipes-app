import { useEffect, useState } from 'react';

function useHeartFill() {
  let recipesFavList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!recipesFavList) {
    recipesFavList = [];
  } else {
    recipesFavList = recipesFavList.map((recipes) => recipes.id);
  }
  const [hearthFillIds, setHearthFillIds] = useState(recipesFavList);
  const [shouldVerifyToFillHeart, setShouldVerifyToFillHeart] = useState(false);

  useEffect(() => {
    function searchAndFill() {
      const allFavoritesRecipesIds = JSON.parse(localStorage.getItem('favoriteRecipes'));
      let foundInFavorites;
      if (allFavoritesRecipesIds) {
        foundInFavorites = allFavoritesRecipesIds.map((recipes) => recipes.id);
      }
      setHearthFillIds(foundInFavorites);
    }
    if (shouldVerifyToFillHeart) {
      searchAndFill();
      setShouldVerifyToFillHeart(false);
    }
  }, [shouldVerifyToFillHeart]);

  return [hearthFillIds, setShouldVerifyToFillHeart];
}

export default useHeartFill;
