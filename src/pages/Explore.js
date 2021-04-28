import React from 'react';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';

function Explore() {
  return (
    <>
      <HeaderFoods hassearchbar={ false }>
        <h1 data-testid="page-title">Explorar</h1>
      </HeaderFoods>
      <h1>Explorar</h1>
      <p>Comidas</p>
      <p>Bebidas</p>
      <BottomMenu />
    </>
  );
}

export default Explore;
