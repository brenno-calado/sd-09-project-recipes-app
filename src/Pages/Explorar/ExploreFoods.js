import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import MenuInferior from '../../components/MenuInferior';

class ExploreFoods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myRandomMeal: '',
    };
  }

  async fetchRandomMeal() {
    const randomMeal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((meal) => meal.meals[0]);
    this.setState({
      myRandomMeal: randomMeal,
    });
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
        <Link to={ `/comidas/${myRandomMeal.idMeal}` }>
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
