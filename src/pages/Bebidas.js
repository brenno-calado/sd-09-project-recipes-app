import React from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
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
