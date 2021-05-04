import React from 'react';
import { Link } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

export default function Explore() {
  return (
    <>
      <Header pageName="Explorar" searchBtn={ false } />
      <div className="explore-container">
        <Link to="/explorar/comidas">
          <button type="button" className="explore-cards" data-testid="explore-food">
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button type="button" className="explore-cards" data-testid="explore-drinks">
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <FooterMenu />
    </>
  );
}
