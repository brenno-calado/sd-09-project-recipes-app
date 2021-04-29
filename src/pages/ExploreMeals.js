import React, { Component } from 'react';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';

class ExplorarComidas extends Component {
  render() {
    const searchIcon = false;
    return (
      <>
        <Header title="Explorar Comidas" searchIcon={ searchIcon } />
        <FooterMenu />
      </>
    );
  }
}

export default ExplorarComidas;
