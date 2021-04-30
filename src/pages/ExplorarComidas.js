import React from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Explorer from '../components/Explorer';

function ExplorarComidas() {
  return (
    <div>
      <Header title="Explorar Comidas" showButton={ false } />
      <Explorer type="foods" />
    </div>
  );
}

export default ExplorarComidas;
