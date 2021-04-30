import React, { useContext } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { RecipiesContext } from '../context/RecipiesContext';

function Bebidas() {
  const { showSearchBar } = useContext(RecipiesContext);
  return (
    <div>
      <Header title="Bebidas" showButton />
      { showSearchBar && <SearchBar isMealsPage={ false } /> }
    </div>
  );
}

export default Bebidas;
