import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';

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
          to="/comidas/52771"
        >
          Me Surpreenda!
        </Link>
        <FooterMenu />
      </div>
    );
  }
}

export default ExplorarComidas;
