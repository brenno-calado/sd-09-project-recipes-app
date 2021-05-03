import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';

class ExplorarComidas extends Component {
  render() {
    const searchIcon = false;
    return (
<<<<<<< HEAD
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
=======
      <>
        <Header title="Explorar Comidas" searchIcon={ searchIcon } />
        <FooterMenu />
      </>
>>>>>>> 78da0ab813aa04c3c2f4f9c64d99a951322e497d
    );
  }
}

export default ExplorarComidas;
