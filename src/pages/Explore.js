import React from 'react';
import HeaderFoods from '../components/HeaderFoods';

function Explore() {
  return (
    <>
      <HeaderFoods hasSearchBar={ false }>
        <h1 data-testid="page-title">Explorar</h1>
      </HeaderFoods>
      <h1>Explorar</h1>
      <p>Comidas</p>
      <p>Bebidas</p>

    </>
  );
}

export default Explore;
