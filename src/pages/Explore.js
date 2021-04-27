import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Explore = () => (
  <div>
    <Header title="Explorar" />
    <p>Esta é a pagina de explorar.</p>

    <Link to="/explorar/comidas">
      <button
        type="button"
        data-testid="explore-food"
      >
        Explorar Comidas
      </button>
    </Link>

    <br />
    <br />

    <Link to="/explorar/bebidas">
      <button
        type="button"
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </button>
    </Link>

    <Footer />
  </div>
);

export default Explore;
