import React from 'react';
// import PropTypes from 'prop-types';

import '../css/pages/NavReceitasFeitas.css';

function NavReceitasFeitas({ onclick }) {
  return (
    <nav className="done-recipes-nav">
      <button
        type="button"
        value="all"
        onClick={ onclick }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        value="food"
        onClick={ onclick }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        value="drinks"
        onClick={ onclick }
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
