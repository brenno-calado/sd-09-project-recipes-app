import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../../../context/RecipesContext';

function DoneFavButtons({ type }) {
  const { resetFilter, filterBy } = useContext(RecipesContext);

  useEffect(() => {
    resetFilter();
  }, []);

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => resetFilter(type) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filterBy('comida') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterBy('bebida') }
      >
        Drinks
      </button>
    </div>
  );
}

DoneFavButtons.propTypes = {
  type: PropTypes.string.isRequired,
};

export default DoneFavButtons;
