import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Bebidas() {
  return (
    <div>
      <Header title="Bebidas" showButton />
      <SearchBar isMealsPage={ false } />
    </div>
  );
}

export default Bebidas;
