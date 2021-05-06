import { useState } from 'react';

const useFilterType = (recip) => {
  const [filteredRecipes, setFilteredRecipes] = useState(recip);

  const setFilterRecipesByType = (filterButton, recipes) => {
    if (filterButton === 'All') {
      setFilteredRecipes(recipes);
      return null;
    }
    setFilteredRecipes(recipes.filter((recipe) => recipe.type === filterButton));
    return null;
  };

  return [filteredRecipes, setFilterRecipesByType];
};

export default useFilterType;
