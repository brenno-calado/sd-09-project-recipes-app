import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FavoriteButton from '../Components/FavoriteButton';
import Share from '../Components/Share';
import { fetchDrinkDetailsAPI } from '../services/ApiRequest';
import { addObj } from '../redux/actions';

const MAX_NUMBER_INGREDIENTS = 3;
class DrinkProgress extends Component {
  constructor() {
    super();
    this.state = {
      drink: {},
      igredients: [],
      ok: false,
    };
    this.itemsDone = this.itemsDone.bind(this);
    this.recipeDone = this.recipeDone.bind(this);
    this.drinkFavorit = this.drinkFavorit.bind(this);
    this.sumblimeText = this.sumblimeText.bind(this);
  }

  componentDidMount() {
    document.querySelector('#finalizar').disabled = true;
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const { addObjDrink } = this.props;

    fetchDrinkDetailsAPI(id)
      .then(({ drinks }) => {
        addObjDrink({
          id: drinks[0].idDrink,
          type: 'bebida',
          area: '',
          category: drinks[0].strCategory,
          alcoholicOrNot: drinks[0].strAlcoholic,
          name: drinks[0].strDrink,
          image: drinks[0].strDrinkThumb,
        });
        this.setState({ drink: drinks[0], ok: true });
        const ingredients = Object.keys(drinks[0])
          .filter((key) => key.includes('strIngredient'));
        this.setState({ igredients: ingredients });
      });
  }

  sumblimeText() {
    const label = document.querySelectorAll('label');
    const input = document.querySelectorAll('input');
    input.forEach((value, index) => {
      if (value.checked === true) label[index].style.textDecoration = 'line-through';
      else label[index].style = null;
    });
  }

  drinkFavorit() {
    const { ok } = this.state;
    if (ok) {
      return (
        <div>
          <FavoriteButton />
          <Share />
        </div>
      );
    }
  }

  itemsDone() {
    const inputs = document.querySelectorAll('input');
    const button = document.querySelector('#finalizar');
    let array = [];
    inputs.forEach((value) => {
      array = [...array, value.checked];
    });
    array = array.every((value) => value === true);
    if (array) button.disabled = false;
    else button.disabled = true;
  }

  recipeDone() {
    const { drink } = this.state;
    const {
      idDrink,
      strCategory,
      strAlcoholic,
      strDrink,
      strDrinkThumb,
      strTags,
    } = drink;
    const now = new Date();
    const data = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const obj = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: data,
      tags: [strTags],
    };
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes === null) localStorage.setItem('doneRecipes', JSON.stringify([obj]));
    else localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, obj]));
  }

  render() {
    const { drink, igredients } = this.state;
    const { strCategory, strDrinkThumb, strDrink, strInstructions } = drink;
    return (
      <div onChange={ this.recipeDone }>
        <h1>Drink em Progresso </h1>
        {this.drinkFavorit()}
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt={ strDrink } />
        <h2 data-testid="recipe-title">{strDrink}</h2>
        <h3 data-testid="recipe-category">{strCategory}</h3>
        <div onChange={ this.itemsDone } id="verifica">
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
            id="finalizar"
            onClick={ this.recipeDone }
          >
            Finalizar Receita
          </button>
        </Link>
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
  addObjDrink: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addObjDrink: (obj) => dispatch(addObj(obj)),
});

export default connect(null, mapDispatchToProps)(DrinkProgress);
