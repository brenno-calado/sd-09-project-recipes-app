import React from 'react';
import HeaderFoods from '../components/HeaderFoods';
import SearchBar from '../components/SearchBar';
import { useRecipeContext } from '../contexts/recipeContext';
import BottomMenu from '../components/BottomMenu';

function Drinks() {
  const { handleFetchDrinkClick } = useRecipeContext();
  return (
    <>
      <HeaderFoods hasSearchBar>
        <h1 data-testid="page-title">Bebidas</h1>
      </HeaderFoods>
      <SearchBar>
        <button
          onClick={ handleFetchDrinkClick }
          data-testid="exec-search-btn"
          type="button"
        >
          Buscar
        </button>
      </SearchBar>
      <BottomMenu />
    </>
  );
}

export default Drinks;
