import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

const CategoriesBar = () => {
  const pathName = useLocation().pathname.split('/');
  const { categories, addCategories, addByCategory,
    addStatusSearch, buttonCategory, changeButtonCategory,
    addRecipes } = useContext(RecipesContext);

  const loadCategories = () => {
    addCategories(pathName[1]);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleClick = ({ target }) => {
    addStatusSearch(true);
    if (buttonCategory === target.value || target.value === 'all') {
      addRecipes(pathName[1], 'name', '');
    } else {
      addByCategory(pathName[1], target.value);
    }
    addStatusSearch(true);
    changeButtonCategory(target.value);
  };

  return (
    <div>
      { categories.map((category) => (
        <button
          data-testid={ `${category.strCategory}-category-filter` }
          key={ category.strCategory }
          type="button"
          name={ category.strCategory }
          value={ category.strCategory }
          onClick={ handleClick }
        >
          { category.strCategory }
        </button>
      )) }
      <button
        data-testid="all-category-filter"
        key="all"
        type="button"
        name="all"
        value="all"
        onClick={ handleClick }
      >
        All
      </button>
    </div>
  );
};

export default CategoriesBar;
