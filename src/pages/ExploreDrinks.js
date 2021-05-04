import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';

function ExploreDrinks() {
  return (
    <>
      <Header pageName="Explorar" searchBtn={ false } />
      <div className="explore-container">
        <Link to="/explorar/bebidas/ingredientes">
          <div className="explore-cards" data-testid="explore-by-ingredient">
            Por Ingredientes
          </div>
        </Link>
        <Link to="/explorar/bebidas">
          {/* pegar receita de bebida aleatoria */}
          <div className="explore-cards" data-testid="explore-surprise">
            Me Surpreenda!
          </div>
        </Link>
      </div>
      <FooterMenu />
    </>
  );
}

export default ExploreDrinks;
