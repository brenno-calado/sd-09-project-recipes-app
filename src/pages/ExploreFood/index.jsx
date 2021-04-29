import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function exploreFoodsIngredient() {
  return (
    <Link to="/explorar/comidas/ingredientes">
      <button type="button" data-testid="explore-by-ingredient">Por Ingredientes</button>
    </Link>
  );
}

function exploreFoodsArea() {
  return (
    <Link to="/explorar/comidas/area">
      <button type="button" data-testid="explore-by-area">Por Local de Origem</button>
    </Link>
  );
}

function exploreFoodsSurprise() {
  return (
    <Link to="/explorar/comidas">
      <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
    </Link>
  );
}

export default function ExploreFood() {
  return (
    <>
      <Header title="Explorar Comidas" />
      <div>
        { exploreFoodsIngredient() }
        { exploreFoodsArea() }
        { exploreFoodsSurprise() }
      </div>
      <Footer />
    </>
  );
}
