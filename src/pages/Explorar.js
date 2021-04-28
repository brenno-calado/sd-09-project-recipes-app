import '../App.css';
import { Link } from 'react-router-dom';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorar() {
  return (
    <>
      <Header title="Explorar" searchIcon={ false } />
      <Link to="/explorar/comidas">
        <div className="pageExplore">
          <h4 data-testid="explore-food">Explorar Comidas</h4>
        </div>
      </Link>
      <Link to="/explorar/bebidas">
        <div className="pageExplore">
          <h4 data-testid="explore-drinks">Explorar Bebidas</h4>
        </div>
      </Link>
      <Footer />
    </>
  );
}

export default Explorar;
