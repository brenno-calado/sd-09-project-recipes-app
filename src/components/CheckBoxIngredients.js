import React from 'react';
import { objectOf } from 'prop-types';
import '../Style/recipeInProgress/style.css';

class CheckBoxIngredients extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    this.changeListItemClass = this.changeListItemClass.bind(this);
  }

  componentDidMount() {
    this.createState();
  }

  createState() {
    this.recoverIngredients().forEach((_, index) => {
      this.setState({
        [`checkBoxClass${index}`]: false,
      });
    });
  }

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

  changeListItemClass({ target }) {
    this.setState({ [target.name]: target.checked });
  }

  render() {
    const ingredients = this.recoverIngredients();
    const checkBoxClass = this.state;
    const measure = this.recoverMeasure();
    return (
      <div>
        {ingredients.map((ingredient, index) => (
          <label
            key={ index }
            htmlFor={ ingredient }
            className={ checkBoxClass[`checkBoxClass${index}`]
              ? 'done-ingredient-list'
              : 'undone-ingretient-list' }
          >
            <input
              type="checkbox"
              data-testid={ `${index}-ingredient-step` }
              onChange={ this.changeListItemClass }
              name={ `checkBoxClass${index}` }
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
