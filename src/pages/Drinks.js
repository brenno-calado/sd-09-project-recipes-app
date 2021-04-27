import React from 'react';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';

function Drinks() {
  return (
    <>
      <HeaderFoods hasSearchBar><h1 data-testid="page-title">Bebidas</h1></HeaderFoods>
      <BottomMenu />
    </>
  );
}

export default Drinks;
