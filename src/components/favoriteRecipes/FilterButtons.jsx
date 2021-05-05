import React, { useContext } from 'react';
import RecipesContext from '../../contexts/RecipesContext';

function FilterButtons() {
  const { favoriteRecipes } = useContext(RecipesContext);
  console.log(favoriteRecipes);

  const filterBy = () => {
    console.log('oi');
    console.log('testando');
  };

  return (
    <>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ filterBy }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ filterBy }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ filterBy }
      >
        Drinks
      </button>
    </>
  );
}

export default FilterButtons;
