import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchMealCategories, fetchCocktailsCategories } from '../services/ApiRequest';

function ShowCategories({ name, searchResult }) {
  const [categories, setCategories] = useState([]);
  const getCategories = useCallback(async (apiRequest) => {
    const getmealsCategory = await apiRequest();
    if (name === 'Comidas') setCategories(getmealsCategory.meals);
    else setCategories(getmealsCategory.drinks);
  }, [name]);
  useEffect(() => {
    if (name === 'Comidas') getCategories(fetchMealCategories);
    else getCategories(fetchCocktailsCategories);
  }, [getCategories, name]);
  const numberOfCategories = 5;
  return (
    <div>
      {!categories
        ? <div>letter</div>
        : categories.map(
          (category, index) => (index < numberOfCategories
            && (
              <button
                type="button"
                data-testid={ `${category.strCategory}-category-filter` }
                key={ category.strCategory }
                onClick={ () => searchResult(category.strCategory) }
              >
                {category.strCategory}
              </button>)
          ),
        )}
      <button
        type="button"
        onClick={ () => searchResult('All') }
      >
        All
      </button>
    </div>
  );
}

ShowCategories.propTypes = {
  name: PropTypes.string.isRequired,
  searchResult: PropTypes.func.isRequired,
};

export default ShowCategories;
