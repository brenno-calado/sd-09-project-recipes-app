import React from 'react';
import HeaderFoods from '../components/HeaderFoods';

function DrinksByIngredient() {
  return (
    <>
      <HeaderFoods>
        <h1 hasSearchBar={ false } data-testid="page-title">Explorar Ingredientes</h1>
      </HeaderFoods>
      <h1>Bebidas por ingrediente</h1>
    </>
  );
}

export default DrinksByIngredient;
