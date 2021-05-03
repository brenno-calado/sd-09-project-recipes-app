import React from 'react';
import { Link } from 'react-router-dom';
import { MenuInferior } from '../Components';

function Explorar() {
  return (
    <div>
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
