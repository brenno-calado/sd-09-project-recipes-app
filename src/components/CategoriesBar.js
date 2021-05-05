import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

const CategoriesBar = () => {
  const pathName = useLocation().pathname.split('/');
  const { categories, addCategories, addByCategory } = useContext(RecipesContext);

  const loadCategories = () => {
    addCategories(pathName[1]);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleClick = ({ target }) => {
    addByCategory(pathName[1], target.value);
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
    </div>
  );
};

export default CategoriesBar;
