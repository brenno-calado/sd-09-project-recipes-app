import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Bebidas() {
  return (
    <div>
      <Header title="Bebidas" showButton />
      <SearchBar isMealsPage={ false } />
    </div>
  );
}

export default Bebidas;
