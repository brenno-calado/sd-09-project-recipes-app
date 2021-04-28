import React from 'react';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';

function ExploreDrinks() {
  return (
    <>
      <HeaderFoods hasSearchBar={ false }>
        <h1 hasSearchBar={ false } data-testid="page-title">Explorar Bebidas</h1>
      </HeaderFoods>
      <h1>Explorar Bebidas</h1>
      <BottomMenu />
    </>
  );
}

export default ExploreDrinks;
