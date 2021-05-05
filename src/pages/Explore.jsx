import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Explore = () => (
  <div>
    <h1 data-testid="page-title">Explorar</h1>
    <Header />
    <Footer />
    <Link to="/explorar/comidas">
      <button type="button" data-testid="explore-food">Explorar Comidas</button>
    </Link>
    <Link to="/explorar/bebidas">
      <button type="button" data-testid="explore-drinks">Explorar Bebidas</button>
    </Link>
  </div>
);

export default Explore;
