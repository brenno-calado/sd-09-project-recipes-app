import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import Menu from '../components/Menu';

const requestFood = () => {
  const food = 'food from endpoint';
  return food;
};

const ExploreFood = () => (
  <div>
    <Header title="Explorar Comidas" />
    <br />
    <div className="buttons">
      <Link to="/explorar/comidas/ingredientes">
        <Button
          block
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </Button>
      </Link>
      <br />
      <Link to="/explorar/comidas/area">
        <Button
          block
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </Button>
      </Link>
      <br />
      <Button
        block
        data-testid="explore-surprise"
        onClick={ () => requestFood() }
      >
        Me Surpreenda!
      </Button>
    </div>
    <br />
    <Menu />
  </div>
);

export default ExploreFood;
