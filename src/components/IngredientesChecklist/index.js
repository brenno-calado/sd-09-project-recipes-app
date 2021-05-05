import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class index extends Component {
  handleIngredient({ target }) {
    console.log(this.isIngredientDone(target.name));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { meals, cocktails } = inProgressRecipes;
    const { id, recipeType } = this.props;
    if (this.isIngredientDone(target.name)) {
      if (recipeType === 'comidas') {
        meals[id] = [...meals[id]
          .filter((ingredient) => ingredient !== target.name)];
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
        return this.forceUpdate();
      }
      if (recipeType === 'bebidas') {
        cocktails[id] = [...cocktails[id]
          .filter((ingredient) => ingredient !== target.name)];
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
        return this.forceUpdate();
      }
    }
    if (!this.isIngredientDone(target.name)) {
      if (recipeType === 'comidas') {
        meals[id] = [...meals[id], target.name];
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
        return this.forceUpdate();
      }
      if (recipeType === 'bebidas') {
        cocktails[id] = [...cocktails[id], target.name];
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
        return this.forceUpdate();
      }
    }
    // console.log();
    // target.defaultChecked = true;
    // if (target.parentNode.style.textDecoration !== 'line-through') {
    //   target.parentNode.style.textDecoration = 'line-through';
    // } else { target.parentNode.style.textDecoration = 'none'; }
  }

  isIngredientDone(ingredient) {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { meals, cocktails } = inProgressRecipes;
    const { id, recipeType } = this.props;
    if (recipeType === 'comidas') {
      const isIngredientDone = meals[id].some((element) => element === ingredient);
      return isIngredientDone;
    }
    if (recipeType === 'bebidas') {
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
            {ingredients.map((ingredient, indexNumber) => (
              <li
                key={ ingredient }
                data-testid={ `${indexNumber}-ingredient-name-and-measure` }
                className={ this.isIngredientDone(ingredient) ? 'ingredient-done' : null }
              >
                {this.checkbox(ingredient)}
                {ingredient}
                {' - '}
                {quantities[indexNumber]}
              </li>))}
          </ul>
        </div>
      </div>
    );
  }
}

index.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  quantities: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default index;
