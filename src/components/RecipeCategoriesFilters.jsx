import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';

function RecipeCategoriesFilters({ type }) {
  const endpoint = type === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const [categories, setCategories] = useState([]);
  const [fetchingCategories, setFetchingCategories] = useState(true);

  useEffect(() => {
    async function fetchRecipeCategories() {
      try {
        const fetchResponse = await fetch(endpoint);
        const jsonResponse = await fetchResponse.json();
        const categoriesToBeShow = 5;
        setCategories(jsonResponse[type].slice(0, categoriesToBeShow));
        setFetchingCategories(false);
        console.log('test');
      } catch (error) {
        console.error(error);
      }
    }
    fetchRecipeCategories();
  }, [endpoint, type]);

  if (fetchingCategories) return <p>Loading Filters...</p>;
  return (
    <div>
      { categories.map((category) => (
        <button
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
          key={ `${category.strCategory}-category-filter` }
        >
          { category.strCategory }
        </button>
      ))}
    </div>
  );
}

RecipeCategoriesFilters.propTypes = {
  type: string,
}.isRequired;

export default RecipeCategoriesFilters;
