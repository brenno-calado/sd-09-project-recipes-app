import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/recipes.css';

class ExplorarBebidasIng extends Component {
  render() {
    return (
      <>
        <Header textProp="Explorar Ingredientes" />
        <button
          type="button"
          data-testid="explore-drinks"
        >
          Lime
        </button>
        <button
          type="button"
          data-testid="explore-food"
        >
          Sugar
        </button>
        <Footer />
      </>
    );
  }
}

export default ExplorarBebidasIng;
