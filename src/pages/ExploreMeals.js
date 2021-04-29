import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class ExplorarComidas extends Component {
  render() {
    const searchIcon = false;
    return (
      <div>
        <Header title="Explorar Comidas" searchIcon={ searchIcon } />
        <Link
          data-testid="explore-by-ingredient"
          to="/explorar/comidas/ingredientes"
        >
          Por Ingredientes
        </Link>
        <Link
          data-testid="explore-by-area"
          to="/explorar/comidas/area"
        >
          Por Local de Origem
        </Link>
        <Link
          data-testid="explore-surprise"
          to="/explorar/comidas/:id"
        >
          Me Surpreenda!
        </Link>
      </div>
    );
  }
}

export default ExplorarComidas;
