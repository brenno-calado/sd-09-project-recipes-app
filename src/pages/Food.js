import React, { useContext, useEffect } from 'react';

import Menu from '../components/Menu';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import RecipesContext from '../context/RecipesContext';
import FilterButtons from '../components/FilterButtons';

const Food = () => {
  const { changeRecipesType, cleanCategories } = useContext(RecipesContext);

  useEffect(() => {
    changeRecipesType('meals');
    cleanCategories();
  }, []);

  return (
    <div>
      <Header title="Comidas" />
      <FilterButtons />
      <RecipesList />
      <Menu />
    </div>
  );
};

export default Food;
