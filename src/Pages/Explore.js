import React from 'react';
import '../styles/BtnExploreFood.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FooterSpec from '../components/FooterSpec';

function Explore() {
  return (
    <div>
      <Header titleHeader="Explorar" />
      <br />
      <Link to="/explorar/comidas">
        <button
          type="button"
          data-testid="explore-food"
          className="btnExploreFood"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          type="button"
          data-testid="explore-drinks"
          className="btnExploreDrink"
        >
          Explorar Bebidas
        </button>
      </Link>
      <FooterSpec />
    </div>
  );
}

export default Explore;
