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
        <Footer />
      </div>
    );
  }
}

export default Explore;
