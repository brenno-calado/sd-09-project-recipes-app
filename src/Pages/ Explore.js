import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../Styles/ExploreDrinksOrMeals.css';

class Explore extends React.Component {
  render() {
    return (
      <div className="exploreContainer">
        <Header name="Explorar" />
        <section className="linksContainer">
          <div className="botlinksContainer">
            <Link to="/explorar/comidas">
              <button data-testid="explore-food" type="button">Explorar Comidas</button>
            </Link>
            <Link to="/explorar/bebidas">
              <button data-testid="explore-drinks" type="button">Explorar Bebidas</button>
            </Link>
          </div>
          <Footer />
        </section>
      </div>
    );
  }
}

export default Explore;
