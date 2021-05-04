import React, { useState } from 'react';
import HeaderFoods from '../components/HeaderFoods';

function RecipesMade() {
  const [recipesMadeButton, setRecipesMadeButton] = useState();
  function getRecipesMade({ target }) {
    setRecipesMadeButton(target.name);
    if (recipesMadeButton === 'all') {
      console.log(recipesMadeButton);
    }
    if (recipesMadeButton === 'food') {
      console.log(recipesMadeButton);
    }
    if (recipesMadeButton === 'drink') {
      console.log(recipesMadeButton);
    }
  }
  return (
    <>
      <HeaderFoods hassearchbar={ false }>
        <h1 data-testid="page-title">Receitas Feitas</h1>
      </HeaderFoods>
      <button
        type="button"
        name="all"
        data-testid="filter-by-all-btn"
        onClick={ getRecipesMade }
      >
        All
      </button>
      <button
        type="button"
        name="food"
        data-testid="filter-by-food-btn"
        onClick={ getRecipesMade }
      >
        Food
      </button>
      <button
        type="button"
        name="drink"
        data-testid="filter-by-drink-btn"
        onClick={ getRecipesMade }
      >
        Drinks
      </button>
    </>
  );
}

export default RecipesMade;
