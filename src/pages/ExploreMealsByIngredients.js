import React, { Component } from 'react';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';

class ExplorarIngredientesComida extends Component {
  render() {
    const searchIcon = false;
    return (
      <>
        <Header title="Explorar Ingredientes" searchIcon={ searchIcon } />
        <FooterMenu />
      </>
    );
  }
}

export default ExplorarIngredientesComida;
