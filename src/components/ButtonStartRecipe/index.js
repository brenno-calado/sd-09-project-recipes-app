import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Style.css';
import PropTypes from 'prop-types';

let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
class index extends Component {
  constructor(props) {
    super(props);
    this.recipe = this.recipe.bind(this);
    this.makeRecipeDone = this.makeRecipeDone.bind(this);
    this.startRecipe = this.startRecipe.bind(this);
    this.isAlreadyDone = this.isAlreadyDone.bind(this);
    this.isAlreadyStarted = this.isAlreadyStarted.bind(this);
    this.buttonStartRecipe = this.buttonStartRecipe.bind(this);
    this.buttonContinueRecipe = this.buttonContinueRecipe.bind(this);
  }

  getCurrentDate() {
    //  https://tecadmin.net/get-current-date-time-javascript/
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    return date;
  }

  recipe() {
    const { recipe } = this.props;
    console.log(recipe);
    if (recipe) { console.log(recipe); }
    const data = {
      id: recipe.idMeal || recipe.idDrink,
      type: recipe.idMeal ? 'comida' : 'bebida',
      area: recipe.strArea ? recipe.strArea : '',
      category: recipe.strCategory ? recipe.strCategory : '',
      alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
      name: recipe.strMeal ? recipe.strMeal : recipe.strDrink,
      image: recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb,
      doneDate: this.getCurrentDate(),
      tags: recipe.strTags ? recipe.strTags : '',
    };
    return data;
  }

  makeRecipeDone() {
    let recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!recipesDone) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    recipesDone.push(this.recipe());
    localStorage.setItem('doneRecipes', JSON.stringify(recipesDone));
    this.forceUpdate();
  }

  startRecipe() {
    if (!inProgressRecipes) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
    inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    const recipe = this.recipe();

    if (recipe.type === 'comida') {
      inProgressRecipes.meals[recipe.id] = [];
    } else if (recipe.type === 'bebida') {
      inProgressRecipes.cocktails[recipe.id] = [];
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    this.forceUpdate();
  }

  isAlreadyDone() {
    const { id } = this.props;
    const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipesDone) {
      return recipesDone.some((recipe) => recipe.id === id);
    }
    return false;
  }

  isAlreadyStarted() {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!recipesInProgress) { return; }
    const recipe = this.recipe();
    console.log(recipe);
    if (!recipe.id) { return false; }
    if (recipe.type === 'comida') {
      if (recipesInProgress.meals[recipe.id]) {
        return true;
      }
      return false;
    }
    if (recipe.type === 'bebida') {
      if (recipesInProgress.cocktails[recipe.id]) {
        return true;
      }
      return false;
    }
  }

  buttonStartRecipe() {
    const currentUrl = window.location.pathname;
    console.log(currentUrl);
    return (
      <Link to={ `${currentUrl}/in-progress` }>
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="start-recipe-btn"
          onClick={ this.startRecipe }
        >
          Iniciar Receita
        </button>
      </Link>
    );
  }

  buttonContinueRecipe() {
    const currentUrl = window.location.pathname;
    return (
      <Link to={ `${currentUrl}/in-progress` }>
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="start-recipe-btn"
          onClick={ console.log('Continua receita') }
        >
          Continuar Receita
        </button>
      </Link>
    );
  }

  render() {
    if (this.isAlreadyStarted()) { return (this.buttonContinueRecipe()); }
    if (!this.isAlreadyDone()) {
      return (this.buttonStartRecipe());
    }
    return (
      <div />
    );
  }
}

index.propTypes = {
  recipe: PropTypes.objectOf().isRequired,
  id: PropTypes.number.isRequired,
};

export default index;
