import React from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from '../components/SearchBar';

function Comidas() {
  return (
    <div>
      <Header title="Comidas" showButton />
      <SearchBar isMealsPage />
    </div>
  );
}

export default Comidas;
