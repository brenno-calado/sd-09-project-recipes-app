import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class ExplorarBebidas extends Component {
  render() {
    const searchIcon = false;
    return (
      <div>
        <Header title="Explorar Bebidas" searchIcon={ searchIcon } />
        <Link
          to="/explorar/bebidas/ingredientes"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </Link>
        <Link
          to="/explorar/bebidas/:id"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </Link>
      </div>
    );
  }
}

export default ExplorarBebidas;
