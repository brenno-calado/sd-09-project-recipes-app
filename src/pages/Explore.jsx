import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  return (
    <>
      <Header title="Explorar" />
      <Footer />
      <Link to="/explorar/comidas" data-testid="explore-food">
        Explorar Comidas
      </Link>
      <br />
      <Link to="/explorar/bebidas" data-testid="explore-drinks">
        Explorar Bebidas
      </Link>
    </>
  );
}

export default Explore;
