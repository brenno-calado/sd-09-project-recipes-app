import React, { Component } from 'react';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';

class ExplorarBebidas extends Component {
  render() {
    const searchIcon = false;
    return (
      <>
        <Header title="Explorar Bebidas" searchIcon={ searchIcon } />
        <FooterMenu />
      </>
    );
  }
}

export default ExplorarBebidas;
