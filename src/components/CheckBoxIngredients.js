import React from 'react';
import { objectOf } from 'prop-types';

class CheckBoxIngredients extends React.Component {
  recoverIngredients() {
    const { recipeObj } = this.props;
    const ingredientsArray = [];
    const mxmIngredients = 20;
    for (let index = 1; index <= mxmIngredients; index += 1) {
      if (recipeObj[`strIngredient${index}`] !== ''
      && recipeObj[`strIngredient${index}`] !== null) {
        ingredientsArray.push(recipeObj[`strIngredient${index}`]);
      }
    }
    return ingredientsArray;
  }

  recoverMeasure() {
    const { recipeObj } = this.props;
    const measureArray = [];
    const mxmIngredients = 20;
    for (let index = 1; index <= mxmIngredients; index += 1) {
      if (recipeObj[`strMeasure${index}`] !== ''
      && recipeObj[`strMeasure${index}`] !== null) {
        measureArray.push(recipeObj[`strMeasure${index}`]);
      }
    }
    return measureArray;
  }

  render() {
    const ingredients = this.recoverIngredients();
    const measure = this.recoverMeasure();
    return (
      <div>
        {ingredients.map((ingredient, index) => (
          <label
            key={ index }
            htmlFor={ ingredient }
            className="ingredient-list"
          >
            <input
              type="checkbox"
              data-testid={ `${index}-ingredient-step` }
            />
            {ingredient}
            -
            {measure[index]}
          </label>
        ))}
      </div>
    );
  }
}

CheckBoxIngredients.propTypes = {
  recipeObj: objectOf,
}.isRequired;

export default CheckBoxIngredients;
