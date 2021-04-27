import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/recipes.css';

class Explorar extends Component {
  constructor() {
    super();

    this.state = {
      toFood: false,
      toDrinks: false,
    };

    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect({ target: { name } }) {
    this.setState({
      [name]: true,
    });
  }

  render() {
    const { toFood, toDrinks } = this.state;

    if (toFood) {
      return (
        <Redirect to="/explorar/comidas" />
      );
    }

    if (toDrinks) {
      return (
        <Redirect to="/explorar/bebidas" />
      );
    }

    return (
      <>
        <Header textProp="Explorar" />
        <button
          type="button"
          data-testid="explore-food"
          name="toFood"
          onClick={ this.handleRedirect }
        >
          Explorar Comidas
        </button>

        <button
          type="button"
          data-testid="explore-drinks"
          name="toDrinks"
          onClick={ this.handleRedirect }
        >
          Explorar Bebidas
        </button>
        <Footer />
      </>
    );
  }
}

export default Explorar;
