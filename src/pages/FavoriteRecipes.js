import React, { useState } from 'react';

import Header from '../components/Header';
import { loadFavoriteRecipesFromLocalStorage } from '../services/favoriteRecipes';
import CardRecipe from '../components/CardRecipe';
import useFilterType from '../hooks/useFilterType';
import FilterRecipes from '../components/FilterRecipes';

const FavoriteRecipes = () => {
  const [favoriteRecipes] = useState(loadFavoriteRecipesFromLocalStorage());
  const [fiteredFavRecipes, setFilterRecipesByType] = useFilterType(favoriteRecipes);
  const [isFavorite] = useState(true);

  const filterButton = ({ target }) => {
    setFilterRecipesByType(target.innerText, favoriteRecipes);
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <FilterRecipes filterButton={ filterButton } />
      <CardRecipe filteredRecipes={ fiteredFavRecipes } isFavorite={ isFavorite } />
    </div>
  );
};

export default FavoriteRecipes;
