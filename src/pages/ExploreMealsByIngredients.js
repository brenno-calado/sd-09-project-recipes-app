import React, { Component } from 'react';
import Header from '../components/Header';

class ExplorarIngredientesComida extends Component {
  render() {
    const searchIcon = false;
    return (
      <Header title="Explorar Ingredientes" searchIcon={ searchIcon } />
    );
  }
}

export default ExplorarIngredientesComida;
