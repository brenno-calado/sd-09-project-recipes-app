import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/recipes.css';

class ExplorarBebidas extends Component {
  constructor() {
    super();

    this.state = {
      byIngredients: false,
      surpriseMe: false,
    };

    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect({ target: { name } }) {
    this.setState({
      [name]: true,
    });
  }

  render() {
    const { byIngredients, surpriseMe } = this.state;

    if (byIngredients) {
      return (
        <Redirect to="/explorar/bebidas/ingredientes" />
      );
    }

    if (surpriseMe) {
      return (
        <Redirect to="/" /> // Redirecionar para a tela de detalhes
      );
    }

    return (
      <>
        <Header textProp="Explorar Bebidas" />
        <button
          type="button"
          data-testid="explore-by-ingredient"
          name="byIngredients"
          onClick={ this.handleRedirect }
        >
          Por Ingredientes
        </button>

        <button
          type="button"
          data-testid="explore-surprise"
          name="surpriseMe"
          onClick={ this.handleRedirect }
        >
          Me Surpreenda!
        </button>
        <Footer />
      </>
    );
  }
}

export default ExplorarBebidas;
