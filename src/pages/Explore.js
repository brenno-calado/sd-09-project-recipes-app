import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

class Explorar extends React.Component {
  render() {
    const searchIcon = false;
    return (
      <div>
        <Header title="Explorar" searchIcon={ searchIcon } />
        <SearchBar />
      </div>
    );
  }
}

export default Explorar;
