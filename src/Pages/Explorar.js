import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

import MenuInferior from '../components/MenuInferior';

function Explorar() {
  return (
    <div>
      <Header />
      <Link to="/comidas">
        <button
          data-testid="explore-food"
          type="button"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/bebidas">
        <button
          data-testid="explore-drinks"
          type="button"
        >
          Explorar Bebidas
        </button>
      </Link>
      <MenuInferior />
    </div>
  );
}

export default Explorar;
