import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getIngredientsDone from '../../services/localStorage';
import { updateRecipeStatus } from '../../actions';

import './style.css';

const INITIAL_PROGRESSRECIPES = {
  cocktails: {},
  meals: {},
};

class index extends Component {
  componentDidUpdate() {
    this.isAllIngredientsDone();
  }

  handleIngredient({ target }) {
    let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) {
      this.createInProgressRecipes();
      inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    }
    const { meals, cocktails } = inProgressRecipes;
    if (this.isIngredientDone(target.name)) {
      this.makeIngredientNotDone(meals, cocktails, target, inProgressRecipes);
      this.isAllIngredientsDone();
      return this.forceUpdate();
    }
    if (!this.isIngredientDone(target.name)) {
      this.makeIngredientDone(meals, cocktails, target, inProgressRecipes);
      this.isAllIngredientsDone();
      return this.forceUpdate();
    }
  }

  makeIngredientNotDone(meals, cocktails, target, inProgressRecipes) {
    const { id, recipeType } = this.props;
    if (recipeType === 'comidas') {
      meals[id] = [...meals[id]
        .filter((ingredient) => ingredient !== target.name)];
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
    if (recipeType === 'bebidas') {
      cocktails[id] = [...cocktails[id]
        .filter((ingredient) => ingredient !== target.name)];
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  }

  makeIngredientDone(meals, cocktails, target, inProgressRecipes) {
    const { id, recipeType } = this.props;
    if (recipeType === 'comidas') {
      if (!meals[id]) {
        meals[id] = [target.name];
      } else {
        meals[id] = [...meals[id], target.name];
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
    if (recipeType === 'bebidas') {
      if (!cocktails[id]) {
        cocktails[id] = [target.name];
      } else {
        cocktails[id] = [...cocktails[id], target.name];
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  }

  isAllIngredientsDone() {
    const { allIngredients, id, updateIsRecipeDone } = this.props;
    const ingredientsDone = getIngredientsDone(id);
    if (allIngredients.length === ingredientsDone.length) {
      updateIsRecipeDone(true);
    } else {
      updateIsRecipeDone(false);
    }
  }

  createInProgressRecipes() {
    localStorage.setItem('inProgressRecipes', JSON.stringify(INITIAL_PROGRESSRECIPES));
  }

  isIngredientDone(ingredient) {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) { return false; }
    const { meals, cocktails } = inProgressRecipes;
    const { id, recipeType } = this.props;
    if (recipeType === 'comidas') {
      if (!meals[id]) { return false; }
      const isIngredientDone = meals[id].some((element) => element === ingredient);
      return isIngredientDone;
    }
    if (recipeType === 'bebidas') {
      if (!cocktails[id]) { return false; }
      const isIngredientDone = cocktails[id].some((element) => element === ingredient);
      return isIngredientDone;
    }
  }

  checkbox(ingredient) {
    return (
      <input
        type="checkbox"
        defaultChecked={ this.isIngredientDone(ingredient) }
        onClick={ (event) => this.handleIngredient(event) }
        name={ ingredient }
      />);
  }

  render() {
    const { ingredients, quantities } = this.props;
    return (
      <div>
        <h3>Ingredientes</h3>
        <div className="background-gray">
          <ul>
            {ingredients.map((ingredient, indexNumber) => {
              if (ingredient === 'carregando') { return; }
              return (
                <li
                  key={ ingredient }
                  className={
                    this.isIngredientDone(ingredient) ? 'ingredient-done' : null
                  }
                  data-testid={ `${indexNumber}-ingredient-step` }
                >
                  { ingredient !== 'Carregando' ? this.checkbox(ingredient) : null}
                  {ingredient}
                  {' - '}
                  {quantities[indexNumber]}
                </li>);
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allIngredients: state.recipeData.ingredients,
});

const mapDispatchToProps = (dispatch) => ({
  updateIsRecipeDone: (status) => dispatch(updateRecipeStatus(status)),
});

index.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  quantities: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
  recipeType: PropTypes.number.isRequired,
  allIngredients: PropTypes.arrayOf().isRequired,
  updateIsRecipeDone: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
