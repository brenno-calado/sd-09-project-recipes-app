import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
<<<<<<< HEAD
=======
import SearchBar from '../components/SearchBar';
import FooterMenu from '../components/FooterMenu';
>>>>>>> 78da0ab813aa04c3c2f4f9c64d99a951322e497d

class Explorar extends React.Component {
  render() {
    const searchIcon = false;
    return (
      <div>
        <Header title="Explorar" searchIcon={ searchIcon } />
<<<<<<< HEAD
        <Link
          to="/explorar/comidas"
          data-testid="explore-food"
        >
          Explorar Comidas
        </Link>
        <Link
          to="/explorar/bebidas"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </Link>
=======
        <SearchBar />
        <FooterMenu />
>>>>>>> 78da0ab813aa04c3c2f4f9c64d99a951322e497d
      </div>
    );
  }
}

export default Explorar;
