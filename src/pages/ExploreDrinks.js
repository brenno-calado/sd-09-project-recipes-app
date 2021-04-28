import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import Menu from '../components/Menu';

const requestDrink = () => {
  const drink = 'drink from endpoint';
  return drink;
};

const ExploreDrinks = () => (
  <div>
    <Header title="Explorar Bebidas" />
    <br />
    <div className="buttons">
      <Link to="/explorar/bebidas/ingredientes">
        <Button
          block
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </Button>
      </Link>
      <br />
      <Button
        block
        data-testid="explore-surprise"
        onClick={ () => requestDrink() }
      >
        Me Surpreenda!
      </Button>
    </div>
    <br />
    <Menu />
  </div>
);
export default ExploreDrinks;
