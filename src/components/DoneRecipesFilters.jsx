import React from 'react';

function DoneRecipesFilters() {
  const filterList = ['all', 'food', 'drink'];
  return (
    <div>
      { filterList.map((filter) => (
        <button
          key={ `filter-by-${filter}-btn` }
          type="button"
          data-testid={ `filter-by-${filter}-btn` }
          onClick=""
        >
          { filter }
        </button>
      ))}
    </div>
  );
}

export default DoneRecipesFilters;
