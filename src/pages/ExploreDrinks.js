import React, { Component } from 'react';
import Header from '../components/Header';

class ExplorarBebidas extends Component {
  render() {
    const searchIcon = false;
    return (
      <Header title="Explorar Bebidas" searchIcon={ searchIcon } />
    );
  }
}

export default ExplorarBebidas;
