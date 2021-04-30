import React, { useContext, useEffect } from 'react';

import Menu from '../components/Menu';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import RecipesContext from '../context/RecipesContext';
import FilterButtons from '../components/FilterButtons';

const Drinks = () => {
  const { changeRecipesType, cleanCategories } = useContext(RecipesContext);

  useEffect(() => {
    changeRecipesType('drinks');
    cleanCategories();
  }, []);

  return (
    <div>
      <Header title="Bebidas" />
      <FilterButtons />
      <RecipesList />
      <Menu />
    </div>
  );
};

export default Drinks;
