import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import Header from '../../components/header';
// import LoadingScreen from '../loadingScreen';
// import IngredientsFoods from '../ingredientsFoods';

class index extends Component {
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
        <Header title="Perfil" iconSearch="hidden" />
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
        <Footer />
      </div>
    );
  }
}

export default index;
