import React from 'react';
import { objectOf } from 'prop-types';

class IngredientsList extends React.Component {
  recoverIngredients() {
    const { recipe } = this.props;
    const ingredientsArray = [];
    const mxmIngredients = 20;
    for (let index = 1; index <= mxmIngredients; index += 1) {
      if (recipe[`strIngredient${index}`] !== ''
      && recipe[`strIngredient${index}`] !== null
      && recipe[`strIngredient${index}`] !== undefined) {
        ingredientsArray.push(recipe[`strIngredient${index}`]);
      }
    }
    return ingredientsArray;
  }

  recoverMeasure() {
    const { recipe } = this.props;
    const measureArray = [];
    const mxmIngredients = 20;
    for (let index = 1; index <= mxmIngredients; index += 1) {
      if (recipe[`strMeasure${index}`] !== ''
      && recipe[`strMeasure${index}`] !== null
      && recipe[`strIngredient${index}`] !== undefined) {
        measureArray.push(recipe[`strMeasure${index}`]);
      }
    }
    return measureArray;
  }

  render() {
    const ingredients = this.recoverIngredients();
    const measure = this.recoverMeasure();
    return (
      <div>
        <h3>Ingredients</h3>
        <ul>
          { ingredients.map((ingredient, index) => (
            <li
              key={ ingredient }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
              -
              { measure[index] }
            </li>)) }
        </ul>
      </div>
    );
  }
}

IngredientsList.propTypes = {
  recipe: objectOf,
}.isRequired;

export default IngredientsList;
