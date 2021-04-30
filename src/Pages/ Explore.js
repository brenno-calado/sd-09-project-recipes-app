import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

class Explore extends React.Component {
  render() {
    return (
      <div>
        <Header name="Explorar" />
        <section>
          <Link
            to="/explorar/comidas"
          >
            <button
              type="button"
              data-testid="explore-food"
            >
              Explorar Comidas
            </button>
          </Link>
          <Link
            to="explorar/bebidas"
          >
            <button
              type="button"
              data-testid="explore-drink"
            >
              Explorar Bebidas
            </button>
          </Link>
        </section>
        <Link to="/explorar/comidas">
          <button data-testid="explore-food" type="button">Explorar Comidas</button>
        </Link>
        <Link to="/explorar/bebidas">
          <button data-testid="explore-drinks" type="button">Explorar Bebidas</button>
        </Link>
        <Footer />
      </div>
    );
  }
}

export default Explore;
