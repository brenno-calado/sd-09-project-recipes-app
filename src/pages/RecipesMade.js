import React from 'react';
import HeaderFoods from '../components/HeaderFoods';

function RecipesMade() {
  return (
    <>
      <HeaderFoods hassearchbar={ false }>
        <h1 data-testid="page-title">Receitas Feitas</h1>
      </HeaderFoods>
      <h1>Comidas Feitas</h1>
    </>
  );
}

export default RecipesMade;
