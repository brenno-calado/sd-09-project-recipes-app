import React from 'react';
import { Link } from 'react-router-dom';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import '../styles/explore.css';

function Explore() {
  return (
    <>
      <Header2 title="Explorar" />
      <main className="container-explore">
        <Link to="/explorar/comidas">
          <button
            type="button"
            data-testid="explore-food"
            className="explore-button"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            type="button"
            data-testid="explore-drinks"
            className="explore-button"
          >
            Explorar Bebidas
          </button>
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default Explore;
