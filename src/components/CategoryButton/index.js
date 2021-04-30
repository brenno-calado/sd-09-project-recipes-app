import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { fetchDrinksByCategory } from '../../service/cocktailAPI';
import { fetchMealsByCategory } from '../../service/mealAPI';

const CategoryButton = ({ strCategory, setFilter, path }) => (
  <button
    type="button"
    data-testid={ `${strCategory}-category-filter` }
    onClick={ async () => {
      const toFilter = path === '/comidas' ? await fetchMealsByCategory(strCategory)
        : await fetchDrinksByCategory(strCategory);
      setFilter(toFilter);
    } }
  >
    {strCategory}
  </button>
);

CategoryButton.propTypes = {
  strCategory: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default CategoryButton;
