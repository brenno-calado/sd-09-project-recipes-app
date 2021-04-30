import React from 'react';
import PropTypes from 'prop-types';

function FiltersFavorites({ data, setData }) {
  function filterByType(typeBtn) {
    const filter = data.filter(({ type }) => type === typeBtn);
    setData(filter);
  }

  function filterAll() {
    setData(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filterAll() }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filterByType('comida') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterByType('bebida') }
      >
        Drinks
      </button>
    </div>
  );
}

FiltersFavorites.propTypes = {
  data: PropTypes.objectOf(PropTypes.array).isRequired,
  setData: PropTypes.func.isRequired,
};

export default FiltersFavorites;
