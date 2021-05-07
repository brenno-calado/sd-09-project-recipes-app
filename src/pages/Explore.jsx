import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../Style/Explore.css';

function Explore() {
  return (
    <div className="explorerPage">
      <Header page="Explorar" />
      <div className="buttons">
        <Link to="/explorar/comidas">
          <Button
            data-testid="explore-food"
            type="button"
            variant="primary"
            size="lg"
            className="btn-explorer"
          >
            Explorar Comidas
          </Button>
        </Link>
        <Link to="/explorar/bebidas">
          <Button
            data-testid="explore-drinks"
            type="button"
            variant="primary"
            size="lg"
            className="btn-explorer"
          >
            Explorar Bebidas
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
