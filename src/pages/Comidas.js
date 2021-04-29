import React from 'react';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from '../components/SearchBar';

function Comidas() {
  return (
    <div>
      <Header />
      <SearchBar isMealsPage />
    </div>

  );
}

export default Comidas;
