import React from 'react';
import { Link } from 'react-router-dom';
import { FaCocktail, FaUtensils } from 'react-icons/fa';
import { Header, Footer } from '../components';
import '../css/Explore.css';

function Explore() {
  return (
    <section>
      <Header title="Explorar" />
      <div className="buttons-explore-container">
        <Link to="/explorar/comidas">
          <FaUtensils className="icon-btn" />
          <div className="box-title-button">
            <button data-testid="explore-food" type="button">Explorar Comidas</button>
            <p className="subtitle">Encontre comidas de outros países</p>
          </div>
        </Link>
        <Link to="/explorar/bebidas">
          <FaCocktail className="icon-btn" />
          <div className="box-title-button">
            <button data-testid="explore-drinks" type="button">Explorar Bebidas</button>
            <p className="subtitle">Explore bebidas de outros países</p>
          </div>
        </Link>
      </div>
      <Footer />
    </section>
  );
}

export default Explore;
