import React from 'react';

import Menu from '../components/Menu';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import FilterButtons from '../components/FilterButtons';

const Food = () => (
  <div>
    <Header title="Comidas" />
    <FilterButtons />
    <RecipesList />
    <Menu />
  </div>
);

export default Food;
