import React from 'react';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';

function ExploreOriginFood() {
  return (
    <>
      <HeaderFoods hasSearchBar>
        <h1 data-testid="page-title">Explorar Origem</h1>
      </HeaderFoods>
      <h1>Explorar Origem de comidas</h1>
      <BottomMenu />
    </>
  );
}

export default ExploreOriginFood;
