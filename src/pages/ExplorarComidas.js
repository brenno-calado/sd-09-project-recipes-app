import React from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Explorer from '../components/Explorer';
import Footer from '../components/Footer';

function ExplorarComidas() {
  return (
    <div>
      <Header title="Explorar Comidas" showButton={ false } />
      <Explorer type="foods" />
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
