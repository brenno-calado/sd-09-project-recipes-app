import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderFoods from '../components/HeaderFoods';
import SearchBar from '../components/SearchBar';
import { useRecipeContext } from '../contexts/recipeContext';

function Foods() {
  const { handleFetchFoodClick, recipesData } = useRecipeContext();
  
  useEffect(() => {
    if (recipesData.length === 1) {
      console.log('objeto', recipesData.meals[0].idMeal);
      const oneItem = recipesData.meals.map(({ idMeal }) => idMeal);
      console.log('one', oneItem);
      return (<Redirect to="/comidas/1" />);
    }
  }, [recipesData]) 

  return (
    <>
      <HeaderFoods hasSearchBar>
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
    </>
  );
}

export default Foods;
