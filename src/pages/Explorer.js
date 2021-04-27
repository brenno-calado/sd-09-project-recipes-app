import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/Menu';

const Explorer = () => (
  <main className="main-explorer">
    <Header />
    <Link to="/explorar/comidas">
      <Button data-testid="explore-food">
        Explorar Comidas
      </Button>
    </Link>
    <Link to="/explorar/bebidas">
      <Button data-testid="explore-drinks">
        Explorar Bebidas
      </Button>
    </Link>
    <Menu />
  </main>
);
export default Explorer;
