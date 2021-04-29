import React from 'react';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from '../components/SearchBar';

function Bebidas() {
  return (
    <div>
      <Header />
      <SearchBar isMealsPage={ false } />
    </div>

  );
}

export default Bebidas;
