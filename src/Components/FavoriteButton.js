import React, { Component } from 'react';
import { connect } from 'react-redux';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { fetchMealsAPI, fetchCocktailAPI } from '../services/ApiRequest';

class FavoriteButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drink: '',
      meal: '',
    };

    this.saveRecipe = this.saveRecipe.bind(this);
  }

  componentDidMount() {
    fetchCocktailAPI()
      .then((response) => this.setState({
        drink: response,
      }));
    fetchMealsAPI()
      .then((response) => this.setState({
        meal: response,
      }));
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }

  saveRecipe() {
    // const [{ id, type, area, category, alcoholicOrNot, name, image }]
    const { drink, meal } = this.state;
    const storage = localStorage.getItem('id');
    const recovery = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const verify = recovery.find((list) => list.idDrink === storage);
    // const memories = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // if (verify[0] !== undefined) {
    //   localStorage.setItem('favoriteRecipes', JSON.stringify(verify));
    // }
    // const memory = recovery.filter((product) => product.idDrink !== storage);
    console.log(verify);
    if (verify === undefined) {
      const object = drink.drinks.filter((value) => value.idDrink === storage);
      const newObject = {
        id: object[0].idDrink,
        category: object[0].strCategory,
        alcoholicOrNot: object[0].strAlcoholic,
        name: object[0].strDrink,
        image: object[0].strDrinkThumb,
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([...recovery, newObject]));
    }
    console.log(verify);
  }

  render() {
    return (
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ this.saveRecipe }
      >
        <img
          src={ whiteHeartIcon }
          alt="favorite-icon"
        />
      </button>
    );
  }
}

const mapStateToProps = (store) => ({
  drink: store,
  meal: store,
});

export default connect(mapStateToProps)(FavoriteButton);
