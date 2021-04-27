import React, { useContext } from 'react';
import Loading from '../components/Loading';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../contexts/RecipesContext';

function Comidas() {
  const {
    showSearchBar,
    toggledSearchBar,
    isLoading,
  } = useContext(RecipesContext);

  const header = () => (
    <button
      data-testid="search-top-btn"
      type="button"
      onClick={ showSearchBar }
    >
      Header
    </button>
  );

  return (
    <section>
      {header()}
      {toggledSearchBar && <SearchBar category="meal" />}
      {isLoading ? <Loading /> : <Recipes /> }
    </section>
  );
}

export default Comidas;
