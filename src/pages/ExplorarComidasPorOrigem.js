import React, { Component } from 'react';
import Header from '../components/Header';

class ExplorarComidasPorOrigem extends Component {
  render() {
    const searchIcon = true;
    return (
      <Header title="Explorar Comidas" searchIcon={ searchIcon } />
    );
  }
}

export default ExplorarComidasPorOrigem;
