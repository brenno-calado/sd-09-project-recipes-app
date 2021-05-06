import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ExploreMeals() {
  return (
    <section>
      <h1>Explore Meals</h1>
      <Link to="/explorar/comidas/ingredientes">
        <Button data-testid="explore-by-ingredient" type="button">
          Por Ingredientes
        </Button>
      </Link>
      <Link to="/explorar/comidas/area">
        <Button data-testid="explore-by-area" type="button">Por Local de Origem</Button>
      </Link>
      <Link to="/comidas/52771">
        <Button data-testid="explore-surprise" type="button">Me Surpreenda!</Button>
      </Link>
    </section>
  );
}

export default ExploreMeals;
