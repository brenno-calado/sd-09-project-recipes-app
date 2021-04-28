import React from 'react';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';

function ExploreFoods() {
  return (
    <>
      <HeaderFoods hassearchbar={ false }>
        <h1 data-testid="page-title">Explorar Comidas</h1>
      </HeaderFoods>
      <h1>Explorar Comidas</h1>
      <BottomMenu />
    </>
  );
}

export default ExploreFoods;
