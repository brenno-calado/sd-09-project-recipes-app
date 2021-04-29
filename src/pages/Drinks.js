import React from 'react';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';

class Bebidas extends React.Component {
  render() {
    const searchIcon = true;
    return (
      <>
        <Header title="Bebidas" searchIcon={ searchIcon } />
        <FooterMenu />
      </>
    );
  }
}

export default Bebidas;
