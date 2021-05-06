import React from 'react';

function filterAllDrinkButton(setListDrinkByCategory, setRecipesData) {
  return (
    <button
      type="button"
      data-testid="All-category-filter"
      onClick={ () => { setListDrinkByCategory([]); setRecipesData([]); } }
    >
      All
    </button>
  );
}

export default filterAllDrinkButton;
