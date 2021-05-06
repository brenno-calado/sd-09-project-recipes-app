import { useState, useEffect } from 'react';

function useRecipeFav() {
  const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [originalFavList] = useState(favoriteList);
  const [mainRecipesFavList, setMainRecipesFavList] = useState(originalFavList);
  const [mainRecipesFilterList, setMainRecipesFilter] = useState(
    { shouldFilter: false, type: null, arrayRecipes: null },
  );

  useEffect(() => {
    function applyFilterOnFavoriteRecipesList() {
      if (mainRecipesFilterList.shouldFilter) {
        if (mainRecipesFilterList.type) {
          if (mainRecipesFilterList.type === 'all') {
            setMainRecipesFavList(originalFavList);
          } else {
            const newList = originalFavList
              .filter((recipe) => recipe.type === mainRecipesFilterList.type);
            setMainRecipesFavList(newList);
          }
        }
        setMainRecipesFilter({ shouldFilter: false, type: null });
      }
    }
    applyFilterOnFavoriteRecipesList();
  }, [originalFavList, mainRecipesFilterList]);

  return [mainRecipesFavList, setMainRecipesFilter];
}

export default useRecipeFav;
