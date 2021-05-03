import React from 'react';
import { Link } from 'react-router-dom';

import MenuInferior from '../components/MenuInferior';

function Explorar() {
  return (
    <div>
      <Link to="/explorar/comidas">
        <button
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
      <MenuInferior />
    </div>
  );
}

export default Explorar;
