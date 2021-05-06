import React from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';

function ExplorarIngredientes() {
  return (
    <div>
      <Header title="Explorar Ingredientes" showExplorerButton={ false } />
      <Footer />
    </div>
  );
}

export default ExplorarIngredientes;
