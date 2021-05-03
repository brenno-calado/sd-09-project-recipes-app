import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import { RecipiesContext } from '../context/RecipiesContext';

export default function CategoryFilters({ isMealsPage }) {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const { setSearchMealsList, setSearchDrinksList } = useContext(RecipiesContext);

  useEffect(() => {
    const MAX_CATEGORIES = 5;
    api.getCategories(isMealsPage)
      .then((res) => setCategories([
        { strCategory: 'All' }, ...res.slice(0, MAX_CATEGORIES)]));
  }, [isMealsPage]);

  function handleCategoryClick(strCategory) {
    if (currentCategory === strCategory || strCategory === 'All') {
      api.getRecipesByName('', isMealsPage).then((recipes) => {
        if (isMealsPage) setSearchMealsList(recipes || []);
        else setSearchDrinksList(recipes || []);
      });
      setCurrentCategory('');
      return;
    }
    api.getRecipesByCategory(strCategory, isMealsPage).then((recipes) => {
      if (isMealsPage) setSearchMealsList(recipes || []);
      else setSearchDrinksList(recipes || []);
    });
    setCurrentCategory(strCategory);
  }

  return (
    <div>
      { categories.map(({ strCategory }) => (
        <button
          type="button"
          onClick={ () => handleCategoryClick(strCategory) }
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
        >
          {strCategory}
        </button>))}
    </div>
  );
}

CategoryFilters.propTypes = {
  isMealsPage: PropTypes.bool.isRequired,
};
