import React from 'react';
import Header from '../components/Header';

class Explorar extends React.Component {
  render() {
    const searchIcon = false;
    return (
      <Header title="Explorar" searchIcon={ searchIcon } />
    );
  }
}

export default Explorar;
