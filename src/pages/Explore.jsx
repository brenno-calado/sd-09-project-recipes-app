import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Explore() {
  return (
    <section>
      <h1>Explore Screen</h1>
      <Link to="/explorar/comidas">
        <Button type="button" data-testid="explore-food">Explorar Comidas</Button>
      </Link>
      <Link to="/explorar/bebidas">
        <Button type="button" data-testid="explore-drinks">Explorar Bebidas</Button>
      </Link>
    </section>
  );
}

export default Explore;
