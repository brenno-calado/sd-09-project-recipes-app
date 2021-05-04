import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';

function ExploreFoods() {
  return (
    <>
      <Header pageName="Explorar" searchBtn={ false } />
      <div className="explore-container">
        <Link to="/explorar/comidas/ingredientes">
          <div className="explore-cards" data-testid="explore-by-ingredient">
            Por Ingredientes
          </div>
        </Link>
        <Link to="/explorar/comidas/area">
          <div className="explore-cards" data-testid="explore-by-area">
            Por Local de Origem
          </div>
        </Link>
        <Link to="/explorar/comidas">
          {/* pegar uma receita de comida aleatoriamente */}
          <div className="explore-cards" data-testid="explore-surprise">
            Me Surpreenda!
          </div>
        </Link>
      </div>
      <FooterMenu />
    </>
  );
}

export default ExploreFoods;
