import React from 'react';
import HeaderFoods from '../components/HeaderFoods';

function FavoriteRecipes() {
  return (
    <>
      <HeaderFoods hasSearchBar={ false }>
        <h1 data-testid="page-title">Receitas Favoritas</h1>
      </HeaderFoods>
      <h1>Comidas Favoritas</h1>
    </>
  );
}

export default FavoriteRecipes;
