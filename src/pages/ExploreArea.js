import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

function ExploreArea() {
  const { showSearchBar } = useContext(RecipesContext);
  return (
    <div>
      <h1>Explorar Area</h1>
      <Header showSearchButton="true" />
      { showSearchBar && <SearchBar /> }
      <Footer />
    </div>
  );
}

export default ExploreArea;
