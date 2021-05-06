import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

function ExploreDrinks() {
  return (
    <section>
      <h1>Explore Drinks</h1>
      <Link to="/explorar/bebidas/ingredientes">
        <Button data-testid="explore-by-ingredient" type="button">
          Por Ingredientes
        </Button>
      </Link>
      <Link to="/bebidas/178319">
        <Button data-testid="explore-surprise" type="button">Me Surpreenda!</Button>
      </Link>
      <BottomNav />
    </section>
  );
}

export default ExploreDrinks;
