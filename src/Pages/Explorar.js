import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../components/Footer';

function Explorar() {
  return (
    <div>
      <Link to="/explorar/comidas">
        <button
          className=""
          data-testid="explore-food"
          type="button"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          data-testid="explore-drinks"
          type="button"
        >
          Explorar Bebidas
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Explorar;
