import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

function Comidas() {
  const [toggledSearchBar, setToggledSearchBar] = useState(false);

  const showSearchBar = () => setToggledSearchBar(!toggledSearchBar);

  return (
    <section>
      <button
        data-testid="search-top-btn"
        type="button"
        onClick={ showSearchBar }
      >
        Header
      </button>
      { toggledSearchBar && <SearchBar /> }
    </section>
  );
}

export default Comidas;
