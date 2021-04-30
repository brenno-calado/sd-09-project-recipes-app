import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareIcon from '../Components/ShareIcon';
import FavoriteButton from '../Components/FavoriteButton';
import { fetchDrinkDetailsAPI } from '../services/ApiRequest';

const MAX_NUMBER_INGREDIENTS = 3;
class DrinkProgress extends Component {
  constructor() {
    super();

    this.state = {
      drink: {},
      igredients: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    fetchDrinkDetailsAPI(id)
      .then(({ drinks }) => {
        console.log(drinks[0]);
        this.setState({ drink: drinks[0] });
        const ingredients = Object.keys(drinks[0])
          .filter((key) => key.includes('strIngredient'));
        this.setState({ igredients: ingredients });
      });
  }

  render() {
    const { drink, igredients } = this.state;
    const { match } = this.props;
    const { params: { id } } = match;
    const { strCategory, strDrinkThumb, strDrink, strInstructions } = drink;
    return (
      <div>
        <h1>Detalhes</h1>
        <ShareIcon />
        <FavoriteButton />
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt={ strDrink } />
        <h2 data-testid="recipe-title">{strDrink}</h2>
        <h3 data-testid="recipe-category">{strCategory}</h3>
        <div>
          {igredients.map((value, index) => {
            if (drink[value] !== null && index < MAX_NUMBER_INGREDIENTS) {
              return (
                <label
                  key={ index }
                  htmlFor={ index }
                  data-testid={ `${index}-ingredient-step` }
                >
                  {drink[value]}
                  <input
                    id={ index }
                    type="checkbox"
                  />
                </label>
              );
            }
            return false;
          })}
        </div>
        <p data-testid="instructions">{strInstructions}</p>
        <Link />
      </div>
    );
  }
}

DrinkProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinkProgress;
