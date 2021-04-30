import React from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Explorer from '../components/Explorer';

function ExplorarBebidas() {
  return (
    <div>
      <Header title="Explorar Bebidas" showButton={ false } />
      <Explorer type="drinks" />
    </div>
  );
}

export default ExplorarBebidas;
