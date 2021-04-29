import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

function ExploreArea() {
  const { showSearchBar } = useContext(RecipesContext);
  return (
    <div>
      <Header showSearchButton="true" title="Explorar Origem" />
      { showSearchBar && <SearchBar /> }
      <Footer />
    </div>
  );
}

export default ExploreArea;
