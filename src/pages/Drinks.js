import React from 'react';

import Menu from '../components/Menu';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import FilterButtons from '../components/FilterButtons';

const Drinks = () => (
  <div>
    <Header title="Bebidas" />
    <FilterButtons />
    <RecipesList />
    <Menu />
  </div>
);

export default Drinks;
