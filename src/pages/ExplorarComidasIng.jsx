import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/recipes.css';

class ExplorarComidasIng extends Component {
  render() {
    return (
      <>
        <Header textProp="Explorar Ingredientes" />
        <button
          type="button"
          data-testid="explore-food"
        >
          Lime
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
        >
          Sugar
        </button>
        <Footer />
      </>
    );
  }
}

export default ExplorarComidasIng;
