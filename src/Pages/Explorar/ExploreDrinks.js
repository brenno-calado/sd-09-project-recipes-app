import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

function ExploreDrinks() {
  return (
    <>
      <Header />
      <div className="content">
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/bebidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-surprise"
          to="/"
        >
          Me Surpreenda!
        </Link>
      </div>
    </>
  );
}
export default ExploreDrinks;
