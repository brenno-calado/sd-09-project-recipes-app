import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import './exploreScreen.css';

function ExploreScreen() {
  return (
    <div className="explore-main-container">
      <Header title="Explorar" />
      <section>
        <Link to="/explorar/comidas">
          <button
            type="button"
            data-testid="explore-food"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            type="button"
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </button>
        </Link>
      </section>
      <Footer />
    </div>
  );
}

export default ExploreScreen;
