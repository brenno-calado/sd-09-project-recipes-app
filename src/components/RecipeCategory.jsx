import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { fetchCategory } from '../services/fetchAPI';

const FIRST_FIVE_CATEGORY = 5;

export default function RecipeCategory({ type, toggleFunc }) {
  const [typeCategoryPopulated, setTypeCategoryPopulated] = useState([]);

  useEffect(() => {
    fetchCategory(type).then((response) => setTypeCategoryPopulated(response));
  }, []);

  return (
    <div>
      {typeCategoryPopulated[type]
      && typeCategoryPopulated[type].length
      && typeCategoryPopulated[type]
        .slice(0, FIRST_FIVE_CATEGORY)
        .map((category) => (
          <button
            type="button"
            key={ `${category.strCategory}` }
            value={ `${category.strCategory}` }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ (e) => toggleFunc(e.target.value) }
          >
            {category.strCategory}
          </button>
        ))}
      <button
        type="button"
        onClick={ () => toggleFunc('all') }
        data-testid="All-category-filter"
      >
        All
      </button>
    </div>
  );
}

RecipeCategory.propTypes = {
  toggleFunc: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
