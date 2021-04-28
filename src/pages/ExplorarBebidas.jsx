import React from 'react';
import '../styles/Header.css';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';

function ExplorarBebidas() {
  return (
    <div>
      <Header page="Explorar Bebidas" hasSearchButton={ false } />
      <BottomMenu />
    </div>
  );
}

export default ExplorarBebidas;
