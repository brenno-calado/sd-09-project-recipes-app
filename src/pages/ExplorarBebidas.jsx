import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';

function ExplorarBebidas() {
  const renderButtons = () => (
    <>
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
    </>
  );
  return (
    <div>
      <Header page="Explorar Bebidas" hasSearchButton={ false } />
      {renderButtons()}
      <BottomMenu />
    </div>
  );
}

export default ExplorarBebidas;
