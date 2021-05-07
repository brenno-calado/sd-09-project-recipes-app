import React from 'react';
import { arrayOf, func, object } from 'prop-types';

function DoneRecipesFilters({ doneRecipesList, setVisibleRecipes }) {
  const filterList = ['all', 'food', 'drink'];

  function handleFilter(index) {
    const filterToApply = ['', 'comida', 'bebida'];
    const filteredRecipes = doneRecipesList.filter(
      (recipe) => recipe.type.includes(filterToApply[index]),
    );
    setVisibleRecipes(filteredRecipes);
  }

  return (
    <div>
      { filterList.map((filter, index) => (
        <button
          key={ `filter-by-${filter}-btn` }
          type="button"
          data-testid={ `filter-by-${filter}-btn` }
          onClick={ () => handleFilter(index) }
        >
          { filter }
        </button>
      ))}
    </div>
  );
}

DoneRecipesFilters.propTypes = {
  doneRecipesList: arrayOf(object),
  setVisibleRecipes: func,
}.isRequired;

export default DoneRecipesFilters;
