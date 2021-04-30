import React from 'react';
// import PropTypes from 'prop-types';

import '../css/pages/NavReceitasFeitas.css';

function NavReceitasFeitas() {
  return (
    <nav className="done-recipes-nav">
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
    </nav>
  );
}

/* NavReceitasFeitas.propTypes = {

} */

export default NavReceitasFeitas;
