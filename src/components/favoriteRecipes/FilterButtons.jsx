import React from 'react';
import PropTypes from 'prop-types';

function FilterButtons({ renderRecipes }) {
  return (
    <>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ renderRecipes }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => renderRecipes('comida') }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => renderRecipes('bebida') }
      >
        Drinks
      </button>
    </>
  );
}

FilterButtons.propTypes = {
  renderRecipes: PropTypes.func,
}.isRequired;

export default FilterButtons;
