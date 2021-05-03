import React from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';

function ExplorarBebidas() {
  return (
    <div>
      <Header title="Explorar Bebidas" showButton={ false } />
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
