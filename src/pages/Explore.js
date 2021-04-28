import React from 'react';
import Header from '../components/Header';

class Explorar extends React.Component {
  render() {
    const searchIcon = false;
    return (
      <div>
        <Header title="Explorar" searchIcon={ searchIcon } />
      </div>
    );
  }
}

export default Explorar;
