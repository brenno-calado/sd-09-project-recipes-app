import React from 'react';
import Header from '../components/Header';
import RecipesCards from '../components/RecipesCards';

function FavoriteRecipes() {
  return (
    <div>
      <Header title="Receitas Favoritas" />
      <RecipesCards />
    </div>
  );
}

export default FavoriteRecipes;
