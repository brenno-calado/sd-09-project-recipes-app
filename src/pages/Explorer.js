import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Menu from '../components/Menu';

const Explorer = () => (
  <main className="main-explorer">
    <Header title="Explorar" />
    <br />
    <div className="buttons">
      <Link to="/explorar/comidas">
        <Button
          block
          data-testid="explore-food"
        >
          Explorar Comidas
        </Button>
      </Link>
      <br />
      <Link to="/explorar/bebidas">
        <Button
          block
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </Button>
      </Link>
    </div>
    <br />
    <Menu />
  </main>
);
export default Explorer;
