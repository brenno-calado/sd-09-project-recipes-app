import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import randomFood from '../../services/randomFood';
import Header from '../../components/Header';
import MenuInferior from '../../components/MenuInferior';

class ExploreFoods extends Component {
  constructor(props) {
    super(props);

    this.state = { myRandomMeal: 0 };
  }

  async componentDidMount() {
    const { meals } = await randomFood();
    console.log(meals);
    this.fetchRandomMeal(meals[0].idMeal);
  }

  fetchRandomMeal(value) {
    this.setState({ myRandomMeal: value });
  }

  render() {
    const { myRandomMeal } = this.state;
    return (
      <div>
        <Header />
        <Link to="/explorar/comidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button type="button" data-testid="explore-by-area">
            Por Local de Origem
          </button>
        </Link>
        <Link to={ `/comidas/${myRandomMeal}` }>
          <button
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
        <MenuInferior />
      </div>
    );
  }
}

export default ExploreFoods;
