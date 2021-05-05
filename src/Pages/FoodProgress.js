import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Share from '../Components/Share';
import FavoriteButton from '../Components/FavoriteButton';
import { fetchMealDetailsAPI } from '../services/ApiRequest';
import { addObj } from '../redux/actions';

const MAX_NUMBER_INGREDIENTS = 8;
class FoodProgress extends Component {
  constructor() {
    super();

    this.state = {
      meal: {},
      igredients: [],
      ok: false,
    };
    this.foodFavorit = this.foodFavorit.bind(this);
    this.sumblimeText = this.sumblimeText.bind(this);
    this.checkedItems = this.checkedItems.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { addObjFood } = this.props;

    fetchMealDetailsAPI(id)
      .then(({ meals }) => {
        addObjFood({
          id: meals[0].idMeal,
          type: 'comida',
          area: meals[0].strArea,
          category: meals[0].strCategory,
          alcoholicOrNot: '',
          name: meals[0].strMeal,
          image: meals[0].strMealThumb,
        });
        this.setState({ meal: meals[0], ok: true });
        const ingredients = Object.keys(meals[0])
          .filter((key) => key.includes('strIngredient'));
        this.setState({ igredients: ingredients });
      });
  }

  checkedItems() {
    const validetion = 0;
    const checkeds = document.querySelectorAll('input');
    const button = document.querySelector('#finalizar');
    checkeds.forEach((checked) => {
      if (checked.checked === true) {
        console.log('dd');
      }
    });
    if (validetion === checkeds.length) button.disabled = true;
    if (validetion <= checkeds.length) button.disabled = false;
  }

  sumblimeText() {
    const label = document.querySelectorAll('label');
    const input = document.querySelectorAll('input');
    input.forEach((value, index) => {
      if (value.checked === true) label[index].style.textDecoration = 'line-through';
      else label[index].style = null;
    });
  }

  foodFavorit() {
    const { ok } = this.state;
    if (ok) return <FavoriteButton />
  }

  render() {
    const { meal, igredients } = this.state;
    // const { match } = this.props;
    // const { params: { id } } = match;
    const { strCategory, strMealThumb, strMeal, strInstructions } = meal;
    return (
      <div>
        <h1>Comidas em Progresso</h1>
        <Share />
        {this.foodFavorit()}
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
                    onClick={ this.sumblimeText }
                  />
                </label>
              );
            }
            return false;
          })}
        </div>
        <p data-testid="instructions">{strInstructions}</p>
        <Link
          to="/receitas-feitas"
        >
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ !this.checkedItems }
          >
            Finalizar Receita
          </button>
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
  addObjFood: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addObjFood: (obj) => dispatch(addObj(obj)),
});

export default connect(null, mapDispatchToProps)(FoodProgress);
