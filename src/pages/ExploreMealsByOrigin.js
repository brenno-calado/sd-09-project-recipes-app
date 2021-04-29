import React, { Component } from 'react';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';

class ExplorarComidasPorOrigem extends Component {
  render() {
    const searchIcon = true;
    return (
      <>
        <Header title="Explorar Origem" searchIcon={ searchIcon } />
        <FooterMenu />
      </>
    );
  }
}

export default ExplorarComidasPorOrigem;
