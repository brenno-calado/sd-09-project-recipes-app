import React from 'react';
import '../styles/Header.css';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';

function ExplorarComidas() {
  return (
    <div>
      <Header page="Explorar Comidas" hasSearchButton={ false } />
      <BottomMenu />
    </div>
  );
}

export default ExplorarComidas;
