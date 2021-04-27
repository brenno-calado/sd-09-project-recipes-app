import React, { useContext } from 'react';
import Loading from '../components/Loading';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../contexts/RecipesContext';
import Header from '../components/Header';
<<<<<<< HEAD
import BottomMenu from '../components/BottomMenu';
=======
>>>>>>> 8760a7167a822e45eeadb71d60117f976e3180cb

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
<<<<<<< HEAD
      <BottomMenu />
=======
>>>>>>> 8760a7167a822e45eeadb71d60117f976e3180cb
    </section>
  );
}

export default Cocktails;
