import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const CategoryButton = ({ strCategory, toggleCategory }) => (
  <button
    type="button"
    data-testid={ `${strCategory}-category-filter` }
    id={ strCategory }
    onClick={ ({ target: { id } }) => toggleCategory(strCategory, id) }
  >
    {strCategory}
  </button>
);

CategoryButton.propTypes = {
  strCategory: PropTypes.string.isRequired,
  toggleCategory: PropTypes.func.isRequired,
};

export default CategoryButton;
