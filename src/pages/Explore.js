import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';
import '../Style/Explore/style.css';

class Explorar extends React.Component {
  render() {
    const searchIcon = false;
    return (
      <div className="explore-container">
        <Header title="Explorar" searchIcon={ searchIcon } />
        <div className="explore-links">
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
        <FooterMenu />
      </div>
    );
  }
}

export default Explorar;
