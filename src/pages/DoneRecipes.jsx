import React, { useState } from 'react';
import Header from '../components/Header';
import HorizontalCard from '../components/HorizontalCard';

function DoneRecipes() {
  const storedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const [shownRecipes, setShownRecipes] = useState(storedRecipes);

  const handleFilter = (filter) => {
    if (filter === undefined) return setShownRecipes(storedRecipes);
    return setShownRecipes(storedRecipes.filter((recipe) => recipe.type === filter));
  };

  return (
    <>
      <Header title=" Receitas Feitas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => handleFilter() }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => handleFilter('comida') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilter('bebida') }
      >
        Drinks
      </button>
      { Object.keys(shownRecipes).length === 0 ? 'no done recipe stored'
        : shownRecipes.map((doneRecipe, index) => (
          <HorizontalCard key={ index } index={ index } doneRecipe={ doneRecipe } />)) }
    </>

  );
}

export default DoneRecipes;
