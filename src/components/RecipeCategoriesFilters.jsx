import React, { useState, useEffect, useContext } from 'react';
import { string } from 'prop-types';
import RecipesContext from '../Provider/RecipesContext';

function RecipeCategoriesFilters({ type }) {
  const {
    selectedFoodsCategory,
    setSelectedFoodsCategory,
    selectedDrinksCategory,
    setSelectedDrinksCategory,
  } = useContext(RecipesContext);
  const [categories, setCategories] = useState([]);
  const [fetchingCategories, setFetchingCategories] = useState(true);

  const selectedCategory = type === 'meals'
    ? selectedFoodsCategory
    : selectedDrinksCategory;

  const setSelectedCategory = type === 'meals'
    ? setSelectedFoodsCategory
    : setSelectedDrinksCategory;

  const endpoint = type === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  useEffect(() => {
    async function fetchRecipeCategories() {
      try {
        const fetchResponse = await fetch(endpoint);
        const jsonResponse = await fetchResponse.json();
        const categoriesToBeShow = 5;
        const apiCategories = jsonResponse[type].slice(0, categoriesToBeShow);
        setCategories([{ strCategory: 'All' }, ...apiCategories]);
        setFetchingCategories(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRecipeCategories();
  }, [endpoint, type]);

  function handleCategoryFilterClick({ target: { value } }) {
    const category = selectedCategory === value ? 'All' : value;
    setSelectedCategory(category);
  }

  if (fetchingCategories) return <p>Loading Filters...</p>;
  return (
    <div>
      { categories.map((category) => (
        <button
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
          key={ `${category.strCategory}-category-filter` }
          value={ category.strCategory }
          onClick={ handleCategoryFilterClick }
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
