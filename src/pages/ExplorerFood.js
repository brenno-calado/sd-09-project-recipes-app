import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

const ExplorerFood = () => (
  <div>
    <Header />
    <div>
      <Link to="/explorar/comidas/ingredientes">
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          data-testid="explore-by-area"
          type="button"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link to="/comidas/aleatoria">
        <button
          data-testid="explore-surprise"
          type="button"
        >
          Me Surpreenda!
        </button>
      </Link>
    </div>
    <MenuInferior />
  </div>
);

export default ExplorerFood;
