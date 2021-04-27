import React from 'react';
import HeaderFoods from '../components/HeaderFoods';

function FoodsByIngredient() {
  return (
    <>
      <HeaderFoods>
        <h1 hasSearchBar={ false } data-testid="page-title">Explorar Ingredientes</h1>
      </HeaderFoods>
      \
      <h1>Comidas por ingrediente</h1>
    </>
  );
}

export default FoodsByIngredient;
