import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import randomApi from '../../services/randomDrink';
import Header from '../../components/Header';
import MenuInferior from '../../components/MenuInferior';

class ExploreDrinks extends Component {
  constructor(props) {
    super(props);
    this.state = { myRandomDrink: 0 };
  }

  async componentDidMount() {
    const { drinks } = await randomApi();
    this.fetchRandomDrink(drinks[0].idDrink);
  }

  fetchRandomDrink(value) {
    this.setState({ myRandomDrink: value });
  }

  render() {
    const { myRandomDrink } = this.state;
    return (
      <div>
        <Header />
        <Link to="/explorar/bebidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
        <Link to={ `/bebidas/drinks/${myRandomDrink}` }>
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
export default ExploreDrinks;
