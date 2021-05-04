import React, { useContext } from 'react';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../contexts/RecipesContext';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import FilterButtons from '../components/FilterButtons';

function Meals() {
  const {
    toggledSearchBar,
  } = useContext(RecipesContext);

  return (
    <section>
      <Header page="Comidas" />
      {toggledSearchBar && <SearchBar category="meal" />}
      <FilterButtons />
      <Recipes />
      <BottomMenu />
    </section>
  );
}

export default Meals;
