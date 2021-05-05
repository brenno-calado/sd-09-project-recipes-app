import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import MenuInferior from '../../components/MenuInferior';

function ExploreFoods() {
  return (
    <>
      <Header />
      <div className="content">
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/comidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-by-area"
          to="/explorar/comidas/area"
        >
          Por Local de Origem
        </Link>
        <Link
          data-testid="explore-surprise"
          to="/"
        >
          Me Surpreenda!
        </Link>
      </div>
      <MenuInferior />
    </>
  );
}
export default ExploreFoods;
