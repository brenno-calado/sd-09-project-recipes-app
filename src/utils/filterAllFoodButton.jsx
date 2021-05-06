import React from 'react';

function filterAllFoodButton(setListItemByCategory, setRecipesData) {
  return (
    <button
      type="button"
      data-testid="All-category-filter"
      onClick={ () => { setListItemByCategory([]); setRecipesData([]); } }
    >
      All
    </button>
  );
}

export default filterAllFoodButton;
