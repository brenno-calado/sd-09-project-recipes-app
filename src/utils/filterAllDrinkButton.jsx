import React from 'react';
import Button from 'react-bootstrap/Button';

function filterAllDrinkButton(setListDrinkByCategory, setRecipesData) {
  return (
    <Button
      variant="light"
      style={ { width: '7rem', margin: ' 0 3px 5px -6px' } }
      type="button"
      data-testid="All-category-filter"
      onClick={ () => { setListDrinkByCategory([]); setRecipesData([]); } }
    >
      All
    </Button>
  );
}

export default filterAllDrinkButton;
