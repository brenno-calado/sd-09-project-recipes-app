import React, { useState } from 'react';
import Header from '../components/Header';
import HeaderSearchBar from '../components/HeaderSearchBar';
import searchIcon from '../images/searchIcon.svg';

export default function Foods() {
  const [searchButton, setSearchButton] = useState(false);

  const handleClickSearchButton = () => {
    setSearchButton(!searchButton);
  };

  return (
    <div>
      <Header title="Comidas" />
      <input
        src={ searchIcon }
        type="image"
        data-testid="search-top-btn"
        onClick={ handleClickSearchButton }
        alt=""
      />
      {searchButton ? <HeaderSearchBar /> : null}
      <p>Esta é a pagina de comidas.</p>
    </div>
  );
}
