import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function exploreDrinkIngredient() {
  return (
    <Link to="/explorar/bebidas/ingredientes">
      <button type="button" data-testid="explore-by-ingredient">Por Ingredientes</button>
    </Link>
  );
}

function exploreDrinkSurprise() {
  return (
    <Link to="/explorar/comidas">
      <button type="button" data-testid="explore-surprise">Me Surpreenda!</button>
    </Link>
  );
}

export default function ExploreDrinks() {
  return (
    <>
      <Header title="Explorar Bebidas" />
      <div>
        { exploreDrinkIngredient() }
        { exploreDrinkSurprise() }
      </div>
      <Footer />
    </>
  );
}
