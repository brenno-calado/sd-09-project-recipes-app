import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Footer from '../components/footer';
import Header from '../components/header';

export default function Explore() {
  return (
    <>
      <Header page="Explorar" />
      <div className="exploreButton-wrapper">
        <Link to="/explorar/comidas">
          <Button data-testid="explore-food" variant="secondary" size="lg" block>
            Explorar Comidas
          </Button>
        </Link>
        <Link to="/explorar/bebidas">
          <Button data-testid="explore-drinks" variant="secondary" size="lg" block>
            Explorar Bebidas
          </Button>
        </Link>
      </div>
      <Footer />
    </>
  );
}
