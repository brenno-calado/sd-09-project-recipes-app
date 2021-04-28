import React from 'react';
import { Redirect } from 'react-router-dom';
import HeaderFoods from '../components/HeaderFoods';
import SearchBar from '../components/SearchBar';
import { useRecipeContext } from '../contexts/recipeContext';
import BottomMenu from '../components/BottomMenu';

function Foods() {
  const { handleFetchFoodClick, recipesData } = useRecipeContext();

  function header() {
    return (
      <>
        <HeaderFoods hassearchbar>
          <h1 data-testid="page-title">Comidas</h1>
        </HeaderFoods>
        <SearchBar>
          <button
            onClick={ handleFetchFoodClick }
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

  if (recipesData.meals) {
    const mealId = recipesData.meals.map(({ idMeal }) => idMeal);
    return recipesData.meals.length === 1 ? (<Redirect to={ `/comidas/${mealId}` } />)
      : header();
  }

  return (
    header()
  );
}

export default Foods;
