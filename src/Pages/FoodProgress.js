import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchMealDetailsAPI } from '../services/ApiRequest';
import ShareIcon from '../Components/ShareIcon';
import FavoriteButton from '../Components/FavoriteButton';

const MAX_NUMBER_INGREDIENTS = 8;
class FoodProgress extends Component {
  constructor() {
    super();

    this.state = {
      meal: {},
      igredients: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    fetchMealDetailsAPI(id)
      .then(({ meals }) => {
        this.setState({ meal: meals[0] });
        const ingredients = Object.keys(meals[0])
          .filter((key) => key.includes('strIngredient'));
        this.setState({ igredients: ingredients });
      });
  }

  render() {
    const { meal, igredients } = this.state;
    const { match } = this.props;
    const { params: { id } } = match;
    const { strCategory, strMealThumb, strMeal, strInstructions } = meal;
    return (
      <div>
        <h1>Detalhes</h1>
        <ShareIcon />
        <FavoriteButton />
        <img data-testid="recipe-photo" src={ strMealThumb } alt={ strMeal } />
        <h2 data-testid="recipe-title">{strMeal}</h2>
        <h3 data-testid="recipe-category">{strCategory}</h3>
        <div>
          {igredients.map((value, index) => {
            if (meal[value] !== '' && index < MAX_NUMBER_INGREDIENTS) {
              return (
                <label
                  key={ index }
                  htmlFor={ index }
                  data-testid={ `${index}-ingredient-step` }
                >
                  {meal[value]}
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
        <Link
          to={ `/comidas/${id}/receitas-feitas` }
          data-testid="finish-recipe-btn"
          // onClick={ () => console.log({ this.state.igredients }) }
        >
          Finalizar Receita
        </Link>
      </div>
    );
  }
}

FoodProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodProgress;
