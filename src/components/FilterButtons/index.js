import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

const FilterButtons = ({ categories, handleFilter }) => (
  <div className="filter-buttons-container">
    <Button
      block
      data-testid="All-category-filter"
      onClick={ () => handleFilter('All') }
    >
      All
    </Button>
    { categories.map(({ strCategory }) => (
      <Button
        block
        key={ strCategory }
        data-testid={ `${strCategory}-category-filter` }
        onClick={ () => handleFilter(strCategory) }
      >
        { strCategory }
      </Button>
    )) }
  </div>
);

FilterButtons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default FilterButtons;
