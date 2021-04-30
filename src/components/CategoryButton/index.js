import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const CategoryButton = ({ strCategory }) => (
  <button
    type="button"
    data-testid={ `${strCategory}-category-filter` }
  >
    {strCategory}
  </button>
);

CategoryButton.propTypes = {
  strCategory: PropTypes.string.isRequired,
};

export default CategoryButton;
