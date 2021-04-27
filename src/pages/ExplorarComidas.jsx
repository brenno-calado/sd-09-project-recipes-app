import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/recipes.css';

class ExplorarComidas extends Component {
  constructor() {
    super();

    this.state = {
      byIngredients: false,
      byArea: false,
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
    const { byIngredients, byArea, surpriseMe } = this.state;

    if (byIngredients) {
      return (
        <Redirect to="/explorar/comidas/ingredientes" />
      );
    }

    if (byArea) {
      return (
        <Redirect to="/explorar/comidas/area" />
      );
    }

    if (surpriseMe) {
      return (
        <Redirect to="/" /> // Redirecionar para a tela de detalhes
      );
    }

    return (
      <>
        <Header textProp="Explorar Comidas" />
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
          data-testid="explore-by-area"
          name="byArea"
          onClick={ this.handleRedirect }
        >
          Por Local de Origem
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

export default ExplorarComidas;
