import React, { useContext } from 'react';
import Loading from '../components/Loading';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../contexts/RecipesContext';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';

function Cocktails() {
  const {
    toggledSearchBar,
    isLoading,
  } = useContext(RecipesContext);

  return (
    <section>
      <Header page="Bebidas" />
      {toggledSearchBar && <SearchBar category="cocktail" />}
      {isLoading ? <Loading /> : <Recipes />}
      <BottomMenu />
    </section>
  );
}

export default Cocktails;
