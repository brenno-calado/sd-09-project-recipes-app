import React from 'react';
import Header from '../components/Header';

export default function ExploreMeals() {
  const searchIcon = false;
  return (
    <div>
      <Header title="Explorar Comidas" searchIcon={ searchIcon } />
      <h6>explorar comidas</h6>
    </div>
  );
}
