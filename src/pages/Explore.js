import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FooterMenu from '../components/FooterMenu';

class Explorar extends React.Component {
  render() {
    const searchIcon = false;
    return (
      <div>
        <Header title="Explorar" searchIcon={ searchIcon } />
        <SearchBar />
        <FooterMenu />
      </div>
    );
  }
}

export default Explorar;
