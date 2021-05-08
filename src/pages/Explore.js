import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';

function Explore() {
  return (
    <>
      <HeaderFoods hassearchbar={ false }>
        <h1 data-testid="page-title">Explorar</h1>
      </HeaderFoods>
      <h1>Explorar</h1>
      <Link to="/explorar/comidas">
        <Button type="button" data-testid="explore-food">Explorar Comidas</Button>
      </Link>
      <Link to="/explorar/bebidas">
        <Button type="button" data-testid="explore-drinks">Explorar Bebidas</Button>
      </Link>
      <BottomMenu />
    </>
  );
}

export default Explore;
