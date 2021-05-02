import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';

function ExplorarComidas() {
  const renderButtons = () => (
    <>
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
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
      <Header page="Explorar Comidas" hasSearchButton={ false } />
      {renderButtons()}
      <BottomMenu />
    </div>
  );
}

export default ExplorarComidas;
