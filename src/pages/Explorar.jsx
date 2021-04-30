import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';

function Explorar() {
  const renderExplorerButtons = () => (
    <>
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
    </>
  );

  return (
    <div>
      <Header page="Explorar" hasSearchButton={ false } />
      {renderExplorerButtons()}
      <BottomMenu />
    </div>
  );
}

export default Explorar;
