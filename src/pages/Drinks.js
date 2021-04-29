import React, { useContext } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../context/RecipesContext';

function Drinks() {
  const { showSearchBar } = useContext(RecipesContext);
  return (
    <>
      <Header showSearchButton />
      { showSearchBar && <SearchBar /> }
    </>
  );
}

export default Drinks;
