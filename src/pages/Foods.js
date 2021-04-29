import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Foods() {
  const { showSearchBar } = useContext(RecipesContext);
  return (
    <>
      <Header showSearchButton getTitleValue />
      { showSearchBar && <SearchBar /> }
    </>
  );
}

export default Foods;
