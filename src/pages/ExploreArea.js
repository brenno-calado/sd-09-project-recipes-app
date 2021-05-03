import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

function ExploreArea() {
  const { showSearchBar } = useContext(RecipesContext);

  function exploreArea() {
    return (
      <select
        data-testid="explore-by-area-dropdown"
      >
        <option
          data-testid="${area}-option"
        >
        </option>
      </select>
    );
  }

  return (
    <div>
      <Header showSearchButton="true" title="Explorar Origem" />
      { showSearchBar && <SearchBar /> }
      <Footer />
    </div>
  );
}

export default ExploreArea;
