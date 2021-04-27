import React from 'react';
import HeaderFoods from '../components/HeaderFoods';

function Foods() {
  return (
    <HeaderFoods hasSearchBar>
      <h1 data-testid="page-title">Comidas</h1>
    </HeaderFoods>
  );
}

export default Foods;
