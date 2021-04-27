import React from 'react';
import HeaderFoods from '../components/HeaderFoods';

function ExploreDrinks() {
  return (
    <>
      <HeaderFoods>
        <h1 hasSearchBar={ false } data-testid="page-title">Explorar Bebidas</h1>
      </HeaderFoods>
      <h1>Explorar IBebidas</h1>
    </>
  );
}

export default ExploreDrinks;
