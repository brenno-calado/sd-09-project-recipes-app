import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  fetchDrinksCategories,
  fetchMealsCategories,
} from '../services/fetchCategories';
import Filter from './Filter';

function Filters({ type }) {
  const [filters, setFilters] = useState([]);
  const fetchFilters = type === 'Drinks' ? fetchDrinksCategories : fetchMealsCategories;

  useEffect(() => {
    const numberOfFilters = 5;
    fetchFilters().then((data) => setFilters(data.slice(0, numberOfFilters)));
  });

  return (
    <div>
      {filters.map((filter, index) => (
        <Filter
          key={ index }
          filter={ filter }
          testId={ `${filter}-category-filter` }
          recipeType={ type }
        />
      ))}
    </div>
  );
}

Filters.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default Filters;
