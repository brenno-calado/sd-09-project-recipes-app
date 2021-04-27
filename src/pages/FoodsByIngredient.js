import React from 'react';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';

function FoodsByIngredient() {
  return (
    <>
      <HeaderFoods>
        <h1 hasSearchBar={ false } data-testid="page-title">Explorar Ingredientes</h1>
      </HeaderFoods>
      \
      <h1>Comidas por ingrediente</h1>
      <BottomMenu />
    </>
  );
}

export default FoodsByIngredient;
