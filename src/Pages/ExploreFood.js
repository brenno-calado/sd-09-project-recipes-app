import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { fetchExplreFoodRadom } from '../services/ApiRequest';
import '../Styles/ExploreDrinksOrMeals.css';

class ExploreFood extends React.Component {
  constructor() {
    super();
    this.state = {
      food: {},
    };
  }

  componentDidMount() {
    fetchExplreFoodRadom()
      .then(({ meals }) => (
        this.setState({ food: meals[0] })
      ));
  }

  render() {
    const { food } = this.state;
    return (
      <div className="exploreContainer">
        <Header name="Explorar Comidas" />
        <div className="linksContainer">
          <Link to="/explorar/comidas/ingredientes">
            <button
              data-testid="explore-by-ingredient"
              type="button"
            >
              Por Ingredientes
            </button>
          </Link>

          <Link to="/explorar/comidas/area">
            <button
              data-testid="explore-by-area"
              type="button"
            >
              Por Local de Origem
            </button>
          </Link>

          <Link to={ `/comidas/${food.idMeal}` }>
            <button data-testid="explore-surprise" type="button">Me Surpreenda!</button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ExploreFood;
