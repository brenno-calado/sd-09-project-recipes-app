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
          <button data-testid="explore-food" type="button">
            <FaUtensils className="icon-btn" />
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button data-testid="explore-drinks" type="button">
            <FaCocktail className="icon-btn" />
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <Footer />
    </section>
  );
}

export default Explore;
