import React from 'react';
import Header from '../components/Header';

class Bebidas extends React.Component {
  render() {
    const searchIcon = true;
    return (
      <Header title="Bebidas" searchIcon={ searchIcon } />
    );
  }
}

export default Bebidas;
