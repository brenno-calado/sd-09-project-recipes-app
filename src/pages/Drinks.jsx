import React from 'react';
import Header from '../components/Header';
import SearchBarDrink from '../components/SearchBarDrink';
import CardDrink from '../components/CardDrink'

export default function Drinks() {
  const searchIcon = true;
  return (
    <div>
      <Header title="Bebidas"
      component={ <SearchBarDrink /> }
      searchIcon={ searchIcon } />
      <h6>bebidas</h6>
      <CardDrink />
    </div>
  );
}
