import React, { Component } from 'react';
import Header from '../components/Header';

class ExplorarIngredientesBebida extends Component {
  render() {
    const searchIcon = false;
    return (
      <Header title="Explorar Comidas" searchIcon={ searchIcon } />
    );
  }
}

export default ExplorarIngredientesBebida;
