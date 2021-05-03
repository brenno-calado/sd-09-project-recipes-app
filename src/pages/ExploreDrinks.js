import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';

class ExplorarBebidas extends Component {
  render() {
    const searchIcon = false;
    return (
<<<<<<< HEAD
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
=======
      <>
        <Header title="Explorar Bebidas" searchIcon={ searchIcon } />
        <FooterMenu />
      </>
>>>>>>> 78da0ab813aa04c3c2f4f9c64d99a951322e497d
    );
  }
}

export default ExplorarBebidas;
