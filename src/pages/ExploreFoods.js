import React from 'react';
import HeaderFoods from '../components/HeaderFoods';

function ExploreFoods() {
  return (
    <>
      <HeaderFoods hasSearchBar={ false }>
        <h1 data-testid="page-title">Explorar Comidas</h1>
      </HeaderFoods>
      <h1>Explorar Comidas</h1>
    </>
  );
}

export default ExploreFoods;
