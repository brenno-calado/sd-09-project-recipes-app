import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Explorar extends React.Component {
  render() {
    const searchIcon = false;
    return (
      <div>
        <Header title="Explorar" searchIcon={ searchIcon } />
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
      </div>
    );
  }
}

export default Explorar;
