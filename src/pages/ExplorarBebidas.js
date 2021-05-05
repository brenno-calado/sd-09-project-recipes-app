import React from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Explorer from '../components/Explorer';
import Footer from '../components/Footer';

function ExplorarBebidas() {
  return (
    <div>
      <Header title="Explorar Bebidas" showExplorerButton={ false } />
      <Explorer type="drinks" />
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
