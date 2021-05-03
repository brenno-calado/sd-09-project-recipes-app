import React from 'react';
import HeaderFoods from '../components/HeaderFoods';
import SearchBar from '../components/SearchBar';
import BottomMenu from '../components/BottomMenu';

function headerDrinks({
  handleFetchDrinkClick,
  categoryButtom,
  listDrinkByCategory,
  recipesData,
  createRender }) {
  return (
    <>
      <HeaderFoods hassearchbar>
        <h1 data-testid="page-title">Bebidas</h1>
      </HeaderFoods>
      <SearchBar>
        <button
          onClick={ () => { handleFetchDrinkClick(); } }
          data-testid="exec-search-btn"
          type="button"
        >
          Buscar
        </button>
      </SearchBar>
      {categoryButtom() }
      {listDrinkByCategory.length
        ? createRender(listDrinkByCategory)
        : (recipesData.drinks && (createRender(recipesData.drinks))) }
      <BottomMenu />
    </>
  );
}

export default headerDrinks;
