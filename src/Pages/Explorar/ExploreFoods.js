import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

function ExploreFoods() {
  return (
    <>
      <Header />
      <div className="content">
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/comidas/ingredientes"
          className="explore-btn"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-by-area"
          to="/explorar/comidas/area"
          className="explore-btn"
        >
          Por Local de Origem
        </Link>
        <Link
          data-testid="explore-surprise"
          to="/"
          className="explore-btn"
        >
          Me Surpreenda!
        </Link>
      </div>
    </>
  );
}
export default ExploreFoods;
