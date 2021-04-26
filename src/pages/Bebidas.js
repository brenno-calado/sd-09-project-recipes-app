import React, { useState } from 'react';
import HeaderSearchBar from '../components/HeaderSearchBar';

export default function Bebidas() {
  const [searchButton, setSearchButton] = useState(false);

  const handleClickSearchButton = () => {
    setSearchButton(!searchButton);
  };

  return (
    <div>
      <p>Esta é a pagina de bebidas.</p>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ handleClickSearchButton }
      >
        Search
      </button>
      {searchButton ? <HeaderSearchBar /> : null}
    </div>
  );
}
