import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

export default function CategoryFilters({ isMealsPage }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const MAX_CATEGORIES = 5;
    api.getCategories(isMealsPage)
      .then((res) => setCategories(res.slice(0, MAX_CATEGORIES)));
  }, [isMealsPage]);
  return (
    <div>
      { categories.map(({ strCategory }) => (
        <span key={ strCategory } data-testid={ `${strCategory}-category-filter` }>
          {strCategory}
        </span>))}
    </div>
  );
}

CategoryFilters.propTypes = {
  isMealsPage: PropTypes.bool.isRequired,
};
