import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  function renderExploreMealsButton() {
    return (
      <Link to={ { pathname: '/explorar/comidas', state: { recipeType: 'Meal' } } }>
        <button type="button" data-testid="explore-food">
          Explorar Comidas
        </button>
      </Link>
    );
  }

  function renderExploreDrinksButton() {
    return (
      <Link to={ { pathname: '/explorar/bebidas', state: { recipeType: 'Drink' } } }>
        <button type="button" data-testid="explore-drinks">
          Explorar Bebidas
        </button>
      </Link>
    );
  }

  return (
    <div>
      <Header title="Explorar" />
      { renderExploreMealsButton() }
      { renderExploreDrinksButton() }
      <Footer />
    </div>
  );
}

export default Explore;
