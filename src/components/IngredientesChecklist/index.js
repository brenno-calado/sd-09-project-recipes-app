import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

const INITIAL_PROGRESSRECIPES = {
  cocktails: {},
  meals: {},
};

class index extends Component {
  handleIngredient({ target }) {
    let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) {
      this.createInProgressRecipes();
      inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    }
    const { meals, cocktails } = inProgressRecipes;
    const { id, recipeType } = this.props;
    if (this.isIngredientDone(target.name)) {
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
      return this.forceUpdate();
    }
    if (!this.isIngredientDone(target.name)) {
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
      return this.forceUpdate();
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

index.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  quantities: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
  recipeType: PropTypes.number.isRequired,
};

export default index;
