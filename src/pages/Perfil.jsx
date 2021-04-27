import React from 'react';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';

function Perfil() {
  return (
    <div>
      <Header page="Perfil" hasSearchButton={ false } />
      <BottomMenu />
    </div>
  );
}

export default Perfil;
