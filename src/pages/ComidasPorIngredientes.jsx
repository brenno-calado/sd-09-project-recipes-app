import React from 'react';
import '../styles/Header.css';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';

function ComidasPorIngredientes() {
  return (
    <div>
      <Header page="Explorar Ingredientes" hasSearchButton={ false } />
      <BottomMenu />
    </div>
  );
}

export default ComidasPorIngredientes;
