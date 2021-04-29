import { Link } from 'react-router-dom';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorar() {
  return (
    <>
      <Header title="Explorar Bebidas" searchIcon={ false } />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/bebidas/178319">
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </>
  );
}

export default Explorar;
