import React from 'react';
import HeaderFoods from '../components/HeaderFoods';
import SearchBar from '../components/SearchBar';

function Foods() {
  return (
    <>
      <HeaderFoods hasSearchBar>
        <h1 data-testid="page-title">Comidas</h1>
      </HeaderFoods>
      <SearchBar />
    </>
  );
}

export default Foods;
