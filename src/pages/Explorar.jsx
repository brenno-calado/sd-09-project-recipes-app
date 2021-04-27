import React from 'react';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';

function Explorar() {
  return (
    <div>
      <Header page="Explorar" hasSearchButton={ false } />
      <BottomMenu />
    </div>
  );
}

export default Explorar;
