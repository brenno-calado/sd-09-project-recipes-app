import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  requestApiMealsbyName,
  requestApiMealsbyLetter,
  requestApiMealsIngredient,
  requestApiMealsArea,
  requestApiCocktailsbyName,
  requestApiCocktailsbyLetter,
  requestApiCocktailsbyIngredient,
} from '../redux/actions';
import '../Styles/SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      radioValue: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchMealsByRadioValue = this.fetchMealsByRadioValue.bind(this);
    this.fetchDrinksByRadioValue = this.fetchDrinksByRadioValue.bind(this);
    this.fetchByLocation = this.fetchByLocation.bind(this);
  }

  handleChange({ target }) {
    console.log(target);
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async fetchByLocation() {
    const location = window.location.pathname;
    return location.includes('comida')
      ? (this.fetchMealsByRadioValue())
      : (this.fetchDrinksByRadioValue());
  }

  async fetchDrinksByRadioValue() {
    const {
      getCocktailsbyName,
      getCocktailsbyLetter,
      getCocktailsbyIngredient,
    } = this.props;
    const { radioValue, input } = this.state;
    switch (radioValue) {
    case 'ingredient':
      return getCocktailsbyIngredient(input);
    case 'name':
      return getCocktailsbyName(input);
    case 'letter':
      if (input.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      return getCocktailsbyLetter(input);
    default:
      return '';
    }
  }

  fetchMealsByRadioValue() {
    const {
      getMealsbyName,
      getMealsbyLetter,
      getMealsbyIngredient,
      getMealsByNacionality,
    } = this.props;
    const { radioValue, input } = this.state;
    switch (radioValue) {
    case 'ingredient':
      return getMealsbyIngredient(input);
    case 'name':
      return getMealsbyName(input);
    case 'letter':
      if (input.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      return getMealsbyLetter(input);
    case 'nationality':
      return getMealsByNacionality(input);
    default:
      return '';
    }
  }

  showIngRadio() {
    return (
      <label
        htmlFor="ingredient-radio"
        className="ingredientRadio"
      >
        <input
          className="ingredientRadio"
          type="radio"
          id="ingredient-radio"
          name="radioValue"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onClick={ this.handleChange }
        />
        Ingrediente
      </label>
    );
  }

  render() {
    const { input } = this.state;
    return (
      <section className="searchContainer">
        <input
          className="inputText"
          name="input"
          type="text"
          data-testid="search-input"
          placeholder="Buscar Receita"
          value={ input }
          onChange={ this.handleChange }
        />
        {window.location.pathname === '/explorar/comidas/area'
          ? ''
          : this.showIngRadio()}
        <label
          htmlFor="name-radio"
          className="nameRadio"
        >
          <input
            className="nameRadio"
            type="radio"
            id="name-radio"
            name="radioValue"
            value="name"
            data-testid="name-search-radio"
            onChange={ this.handleChange }
          />
          Nome
        </label>
        <label
          htmlFor="first-letter-radio"
          className="letterRadio"
        >
          <input
            className="letterRadio"
            type="radio"
            id="first-letter-radio"
            name="radioValue"
            value="letter"
            data-testid="first-letter-search-radio"
            onChange={ this.handleChange }
          />
          Primeira-letra
        </label>
        <button
          className="execBtn"
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => {
            this.fetchByLocation();
          } }
        >
          Buscar
        </button>
      </section>
    );
  }
}

SearchBar.propTypes = {
  getMealsbyName: PropTypes.func.isRequired,
  getMealsbyLetter: PropTypes.func.isRequired,
  getMealsbyIngredient: PropTypes.func.isRequired,
  getMealsByNacionality: PropTypes.func.isRequired,
  getCocktailsbyName: PropTypes.func.isRequired,
  getCocktailsbyLetter: PropTypes.func.isRequired,
  getCocktailsbyIngredient: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cocktails: state.cocktails.cocktails,
  meals: state.meals.meals,
});

const mapDispatchToProps = (dispatch) => ({
  getMealsbyName: (input) => dispatch(requestApiMealsbyName(input)),
  getMealsbyLetter: (input) => dispatch(requestApiMealsbyLetter(input)),
  getMealsbyIngredient: (input) => dispatch(requestApiMealsIngredient(input)),
  getMealsByNacionality: (input) => dispatch(requestApiMealsArea(input)),
  getCocktailsbyName: (input) => dispatch(requestApiCocktailsbyName(input)),
  getCocktailsbyLetter: (input) => dispatch(requestApiCocktailsbyLetter(input)),
  getCocktailsbyIngredient: (input) => dispatch(requestApiCocktailsbyIngredient(input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
