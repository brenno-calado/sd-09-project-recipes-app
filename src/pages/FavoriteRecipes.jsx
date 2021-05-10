import React from 'react';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';

function FavoriteRecipes() {
  return (
    <div>
      <Header title="Receitas Favoritas" />
      <RecipesList />
    </div>
  );
}

export default FavoriteRecipes;
